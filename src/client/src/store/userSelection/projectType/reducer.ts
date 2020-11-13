import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import WizardSelectionActionType from "../selectionActionType";
import { WIZARD_PROJECT_TYPE } from "../../../utils/constants/internalNames";

//TODO Could this come from the command chosen to open the app? And.. once only?
const initialState = WIZARD_PROJECT_TYPE.RN_TABBED_APP;

const backendFramework = (
  state: string = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SELECT_PROJECT_TYPE:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
