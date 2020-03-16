import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, RouteComponentProps } from "react-router-dom";
import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";

import {
  EXTENSION_COMMANDS,
  ROUTES,
  DEVELOPMENT,
  FRAMEWORK_TYPE
} from "./utils/constants";

import { getVSCodeApi } from "./actions/vscodeApiActions/getVSCodeApi";
import { logIntoAzureAction } from "./actions/azureActions/logIntoAzure";
import {
  updateOutputPathAction
} from "./actions/wizardSelectionActions/updateProjectNameAndPath";

import { setValidations } from "./actions/wizardSelectionActions/setValidations";
import {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
} from "./actions/wizardInfoActions/updateGenStatusActions";
import {
  selectPagesAction
} from "./actions/wizardSelectionActions/selectPages";
import { getVersionsDataAction } from "./actions/wizardInfoActions/getVersionData";

import appStyles from "./appStyles.module.css";
import { IVersions } from "./types/version";
import { getVSCodeApiSelector } from "./selectors/vscodeApiSelector";
import { IVSCodeObject } from "./reducers/vscodeApiReducer";
import { IServiceStatus } from "./reducers/generationStatus/genStatus";
import { ISelected } from "./types/selected";
import { AppState } from "./reducers";
import { IOption } from "./types/option";
import { setPreviewStatusAction } from "./actions/wizardContentActions/setPreviewStatus";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "./actions/ActionType";
import { getPagesOptionsAction } from "./actions/wizardContentActions/getPagesOptions";
import { getPages, getFrameworks, getUserStatus, getTemplateInfo } from "./utils/extensionService/extensionService";

import { setBackendFrameworksAction } from "./actions/wizardContentActions/setBackendFrameworks";
import { setFrontendFrameworksAction } from "./actions/wizardContentActions/setFrontendFrameworks";
import { parseFrameworksPayload } from "./utils/parseFrameworksPayload";

import Loadable from "react-loadable";
import PageDetails from "./containers/PageDetails";
import { MODAL_TYPES } from "./actions/modalActions/typeKeys";

import PageSelectFrameworks from  "./containers/PageSelectFrameworks";
import PageAddPages from "./containers/PageAddPages";
import PageReviewAndGenerate from "./containers/PageReviewAndGenerate";

import PageAzureLogin from "./containers/PageAzureLogin";
import PostGenerationModal from  "./containers/PostGenerationModal";
import CosmosResourceModal from"./containers/CosmosResourceModal";
 
import AppServiceModal from "./containers/AppServiceModal";
import ViewLicensesModal from "./containers/ViewLicensesModal";
import RedirectModal from "./containers/RedirectModal";

import Header from  "./containers/Header";
import TopNavBar from "./components/TopNavBar";

import RightSidebar from "./containers/RightSidebar";
import Footer from "./containers/Footer";
import PageNewProject from "./containers/PageNewProject";


if (process.env.NODE_ENV === DEVELOPMENT) {
  require("./css/themes.css");
}

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  setValidations: (validations: any) => void;
  updateTemplateGenStatusMessage: (status: string) => any;
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => any;
  getVersionsData: (versions: IVersions) => any;
  getPages: (pages: IOption[]) => any;
  setPreviewStatus: (isPreview: boolean) => void;
  setPages: (pages: ISelected[]) => void;
  setBackendFrameworks: (frameworks: IOption[]) => any;
  setFrontendFrameworks: (frameworks: IOption[]) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
  selectedFrontend: ISelected;
  selectedBackend: ISelected;
  selectedPages: ISelected[];
  isPreview: boolean;
  modalState: any;
}

type Props = IDispatchProps & IStateProps ;

const App = (props: Props) => {
  const { selectedFrontend, selectedBackend, vscode, selectedPages, setPages, frontendOptions,
    isPreview, setFrontendFrameworks, setBackendFrameworks, modalState, logIntoAzure } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const promisesLoading: Array<any> = new Array<any>();



  if (frontendOptions.length === 0){
    messageEventsFromExtension();
    getFrameworksListAndSetToStore();
  }



  React.useEffect(()=>{
    props.getVSCodeApi();
  },[]);

  React.useEffect(()=>{
    getUserStatus(vscode).then((event)=>{
      const message = event.data;
      if (message.payload !== null) {
        logIntoAzure(
          message.payload.email,
          message.payload.subscriptions
        );
      }
    });

    getTemplateInfo(vscode).then((event)=>{
      const message = event.data;
      const versionData: IVersions = {
        templatesVersion:message.payload.templatesVersion,
        wizardVersion: message.payload.wizardVersion
      };
      props.getVersionsData(versionData);
      props.setValidations({
        itemNameValidationConfig:message.payload.itemNameValidationConfig,
        projectNameValidationConfig:message.payload.projectNameValidationConfig
      });
      props.setPreviewStatus(message.payload.preview);
    });
  },[props.vscode]);

  React.useEffect(()=>{
    loadPages();
  },[selectedFrontend, selectedBackend]);

  function getFrameworksListAndSetToStore(){
    getFrameworks(vscode, isPreview).then((event: any)=>{
      const message = event.data;
      setFrontendFrameworks(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.FRONTEND,
          message.payload.isPreview
        )
      );
      setBackendFrameworks(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.BACKEND,
          message.payload.isPreview
        )
      );
    });
  }

  const loadPages = () => {
    getPages(vscode, selectedFrontend.internalName, selectedBackend.internalName).then((event)=>{
      props.getPages(event.data.payload.pages);
      selectedPages.map((selectedPage)=>{
        selectedPage.internalName = `wts.Page.${selectedFrontend.internalName}.${selectedPage.defaultName ? selectedPage.defaultName.replace(" ",""):""}`;
      });
      setPages(selectedPages);
    });
  }

  function messageEventsFromExtension(){
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        //only one way
        //from extension to client
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload !== null && message.payload.outputPath !== undefined) {
            props.updateOutputPath(message.payload.outputPath);
          }
          break;
        case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
          props.updateTemplateGenStatusMessage(message.payload.status);
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          props.updateTemplateGenStatus(message.payload);
          break;
      }
    });
  }

  return (
    <div>

        <main
          className={classnames(appStyles.centerView, appStyles.centerViewNewProjectPage )}
        >
         <PageNewProject></PageNewProject>

        </main>
   
    </div>
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  getVSCodeApi: () => {
    dispatch(getVSCodeApi());
  },
  logIntoAzure: (email: string, subscriptions: any[]) => {
    dispatch(logIntoAzureAction({ email, subscriptions }));
  },
  updateOutputPath: (outputPath: string) => {
    dispatch(updateOutputPathAction(outputPath));
  },
  setValidations: (validations: any) => {
    dispatch(setValidations(validations));
  },
  updateTemplateGenStatusMessage: (status: string) => {
    dispatch(updateTemplateGenerationStatusMessageAction(status));
  },
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => {
    dispatch(updateTemplateGenerationStatusAction(isGenerated));
  },
  getPages: (pages: IOption[]) => {
    dispatch(getPagesOptionsAction(pages));
  },
  getVersionsData: (versions: IVersions) => {
    dispatch(getVersionsDataAction(versions));
  },
  setPreviewStatus: (isPreview: boolean) => {
    dispatch(setPreviewStatusAction(isPreview));
  },
  setPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  setBackendFrameworks: (frameworks: IOption[]) => {
    dispatch(setBackendFrameworksAction(frameworks));
  },
  setFrontendFrameworks: (frameworks: IOption[]) => {
    dispatch(setFrontendFrameworksAction(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  selectedFrontend: state.selection.frontendFramework,
  selectedBackend: state.selection.backendFramework,
  frontendOptions: state.wizardContent.frontendOptions,
  selectedPages: state.selection.pages,
  isPreview:  state.wizardContent.previewStatus,
  modalState: state.modals.openModal
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
