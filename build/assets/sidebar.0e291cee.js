import{M as s}from"./index.7aec1e25.js";const a=s({id:"sidebar",state:()=>({collapsed:!1}),getters:{SIDEBAR_WIDTH:e=>200,SIDEBAR_WIDTH_COLLAPSED:e=>38,sidebarWidth:e=>`${e.collapsed?e.SIDEBAR_WIDTH_COLLAPSED:e.SIDEBAR_WIDTH}px`},actions:{toggle(){this.collapsed=!this.collapsed}}});export{a as u};