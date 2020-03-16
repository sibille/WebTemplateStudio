import * as React from "react";
import Loadable from "react-loadable";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "./constants";

import warning from "../assets/warning.svg";
import cancel from "../assets/cancel.svg";
import greencheck from "../assets/checkgreen.svg";

import FullStack from "./svgComponents/FullStack";
import MasterDetail from  "./svgComponents/MasterDetail";
import BlankPage from "./svgComponents/BlankPage";

import ContentGrid from  "./svgComponents/ContentGrid";

import Masterdetailscreenshot from  "./svgComponents/Masterdetailscreenshot";

import Listscreenshot from "./svgComponents/Listscreenshot";

import Gridscreenshot from "./svgComponents/Gridscreenshot";
 
import Blankscreenshot from "./svgComponents/Blankscreenshot";
 
import List from "./svgComponents/List";
  
//icons
import ReactIcon from "./svgComponents/ReactIcon";
  
import AngularIcon from "./svgComponents/AngularIcon";
 
import VueIcon from "./svgComponents/VueIcon";
  
import NodeIcon from "./svgComponents/NodeIcon";
  
import FlaskIcon from "./svgComponents/FlaskIcon";
  
import MoleculerIcon from "./svgComponents/MoleculerIcon";
  
import AzureIcon from  "./svgComponents/AzureIcon";
  
import AppserviceIcon from "./svgComponents/AppserviceIcon";
  
import CosmosdbIcon from  "./svgComponents/CosmosdbIcon";

const SVG_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT]: (style: string) => (
    <ReactIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR]: (style: string) => (
    <AngularIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE]: (style: string) => (
    <VueIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE]: (style: string) => (
    <NodeIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER]: (style: string) => (
    <MoleculerIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK]: (style: string) => (
    <FlaskIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE]: (style: string) => (
    <AppserviceIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.AZURE]: (style: string) => (
    <AzureIcon style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: (style: string) => (
    <CosmosdbIcon style={style}/>
  )
};

const SVG_REACTCOMPONENT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP]: (style: string) => (
    <FullStack style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => (
    <MasterDetail style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => (
    <BlankPage style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => (
    <ContentGrid style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => (
    <List style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => (
    <MasterDetail style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => (
    <BlankPage style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => (
    <ContentGrid style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => (
    <List style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => (
    <MasterDetail style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => (
    <BlankPage style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => (
    <ContentGrid style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => (
    <List style={style} />
  )
};

const SVG_SCREENSHOT_MAPPINGS = {
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot style={style} />
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_MASTER_DETAIL]: (style: string) => (
    <Masterdetailscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_CONTENT_GRID]: (style: string) => (
    <Gridscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_LIST]: (style: string) => (
    <Listscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_LIST]: (style: string) => (
    <Listscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_LIST]: (style: string) => (
    <Listscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.REACT_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.ANGULAR_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot style={style}/>
  ),
  [WIZARD_CONTENT_INTERNAL_NAMES.VUE_BLANK_PAGE]: (style: string) => (
    <Blankscreenshot style={style}/>
  )
};

export const withLocalPath = (absolutePath: string): string => {
  return process.env.REACT_APP_RELATIVE_PATH + absolutePath;
};

export const getScreenShot = (internalName: string, style?: string) => {
  if (SVG_SCREENSHOT_MAPPINGS[internalName] !== undefined) {
    return SVG_SCREENSHOT_MAPPINGS[internalName](style || "");
  }
};

export const getSvg = (internalName: string, style?: string) => {
  if (SVG_REACTCOMPONENT_MAPPINGS[internalName]) {
    return SVG_REACTCOMPONENT_MAPPINGS[internalName](style || "");
  }
  if (SVG_MAPPINGS[internalName]) {
    return SVG_MAPPINGS[internalName](style || "");
  }
};

export const getCancelSvg = (): string => withLocalPath(cancel);
export const getWarningSvg = (): string => withLocalPath(warning);
export const getGreenCheckSvg = (): string => withLocalPath(greencheck);
