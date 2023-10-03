"use strict";(self.webpackChunkmui_demo=self.webpackChunkmui_demo||[]).push([[645],{8645:function(e,o,n){n.r(o),n.d(o,{default:function(){return ce}});var t=n(1413),r=n(2791),a=n(9292),i=n(4554),c=n(5527),l=n(8683),s=n(4942),d=n(3366),u=n(7462),p=n(3733),h=n(4419),f=n(2065),m=n(9439),v=n(4036),x=n(7630),g=n(8278);var Z=r.createContext(void 0);var b=n(1781),S=n(5878),k=n(1217);function y(e){return(0,k.Z)("PrivateSwitchBase",e)}(0,S.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var w=n(184),j=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],C=(0,x.ZP)(b.Z)((function(e){var o=e.ownerState;return(0,u.Z)({padding:9,borderRadius:"50%"},"start"===o.edge&&{marginLeft:"small"===o.size?-3:-12},"end"===o.edge&&{marginRight:"small"===o.size?-3:-12})})),z=(0,x.ZP)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),I=r.forwardRef((function(e,o){var n=e.autoFocus,t=e.checked,a=e.checkedIcon,i=e.className,c=e.defaultChecked,l=e.disabled,s=e.disableFocusRipple,f=void 0!==s&&s,x=e.edge,b=void 0!==x&&x,S=e.icon,k=e.id,I=e.inputProps,R=e.inputRef,M=e.name,N=e.onBlur,B=e.onChange,P=e.onFocus,F=e.readOnly,T=e.required,O=void 0!==T&&T,A=e.tabIndex,_=e.type,E=e.value,L=(0,d.Z)(e,j),V=(0,g.Z)({controlled:t,default:Boolean(c),name:"SwitchBase",state:"checked"}),K=(0,m.Z)(V,2),D=K[0],q=K[1],H=r.useContext(Z),W=l;H&&"undefined"===typeof W&&(W=H.disabled);var G="checkbox"===_||"radio"===_,U=(0,u.Z)({},e,{checked:D,disabled:W,disableFocusRipple:f,edge:b}),J=function(e){var o=e.classes,n=e.checked,t=e.disabled,r=e.edge,a={root:["root",n&&"checked",t&&"disabled",r&&"edge".concat((0,v.Z)(r))],input:["input"]};return(0,h.Z)(a,y,o)}(U);return(0,w.jsxs)(C,(0,u.Z)({component:"span",className:(0,p.Z)(J.root,i),centerRipple:!0,focusRipple:!f,disabled:W,tabIndex:null,role:void 0,onFocus:function(e){P&&P(e),H&&H.onFocus&&H.onFocus(e)},onBlur:function(e){N&&N(e),H&&H.onBlur&&H.onBlur(e)},ownerState:U,ref:o},L,{children:[(0,w.jsx)(z,(0,u.Z)({autoFocus:n,checked:t,defaultChecked:c,className:J.input,disabled:W,id:G?k:void 0,name:M,onChange:function(e){if(!e.nativeEvent.defaultPrevented){var o=e.target.checked;q(o),B&&B(e,o)}},readOnly:F,ref:R,required:O,ownerState:U,tabIndex:A,type:_},"checkbox"===_&&void 0===E?{}:{value:E},I)),D?a:S]}))})),R=n(9201),M=(0,R.Z)((0,w.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),N=(0,R.Z)((0,w.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),B=(0,R.Z)((0,w.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),P=n(1046);function F(e){return(0,k.Z)("MuiCheckbox",e)}var T=(0,S.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),O=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],A=(0,x.ZP)(I,{shouldForwardProp:function(e){return(0,x.FO)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,o){var n=e.ownerState;return[o.root,n.indeterminate&&o.indeterminate,"default"!==n.color&&o["color".concat((0,v.Z)(n.color))]]}})((function(e){var o,n=e.theme,t=e.ownerState;return(0,u.Z)({color:(n.vars||n).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:n.vars?"rgba(".concat("default"===t.color?n.vars.palette.action.activeChannel:n.vars.palette.primary.mainChannel," / ").concat(n.vars.palette.action.hoverOpacity,")"):(0,f.Fq)("default"===t.color?n.palette.action.active:n.palette[t.color].main,n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==t.color&&(o={},(0,s.Z)(o,"&.".concat(T.checked,", &.").concat(T.indeterminate),{color:(n.vars||n).palette[t.color].main}),(0,s.Z)(o,"&.".concat(T.disabled),{color:(n.vars||n).palette.action.disabled}),o))})),_=(0,w.jsx)(N,{}),E=(0,w.jsx)(M,{}),L=(0,w.jsx)(B,{}),V=r.forwardRef((function(e,o){var n,t,a=(0,P.Z)({props:e,name:"MuiCheckbox"}),i=a.checkedIcon,c=void 0===i?_:i,l=a.color,s=void 0===l?"primary":l,f=a.icon,m=void 0===f?E:f,x=a.indeterminate,g=void 0!==x&&x,Z=a.indeterminateIcon,b=void 0===Z?L:Z,S=a.inputProps,k=a.size,y=void 0===k?"medium":k,j=a.className,C=(0,d.Z)(a,O),z=g?b:m,I=g?b:c,R=(0,u.Z)({},a,{color:s,indeterminate:g,size:y}),M=function(e){var o=e.classes,n=e.indeterminate,t=e.color,r=e.size,a={root:["root",n&&"indeterminate","color".concat((0,v.Z)(t)),"size".concat((0,v.Z)(r))]},i=(0,h.Z)(a,F,o);return(0,u.Z)({},o,i)}(R);return(0,w.jsx)(A,(0,u.Z)({type:"checkbox",inputProps:(0,u.Z)({"data-indeterminate":g},S),icon:r.cloneElement(z,{fontSize:null!=(n=z.props.fontSize)?n:y}),checkedIcon:r.cloneElement(I,{fontSize:null!=(t=I.props.fontSize)?t:y}),ownerState:R,ref:o,className:(0,p.Z)(M.root,j)},C,{classes:M}))}));var K=function(e){var o=e.color,n=e.width,t=e.isDisabled,r=void 0!==t&&t;return(0,w.jsx)(w.Fragment,{children:(0,w.jsx)(V,{disabled:r,"aria-label":"checkbox",defaultChecked:!0,sx:{width:"max-content",aspectRatio:"1",color:!0===r?"gray":o,"&:hover":{},"& .MuiSvgIcon-root":{fontSize:n,color:!0===r?"gray":o},"&.Mui-checked":{color:!0===r?"gray":o}}})})},D=n(2242),q=(0,R.Z)((0,w.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),H=(0,R.Z)((0,w.jsx)("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),W=(0,x.ZP)("span")({position:"relative",display:"flex"}),G=(0,x.ZP)(q)({transform:"scale(1)"}),U=(0,x.ZP)(H)((function(e){var o=e.theme,n=e.ownerState;return(0,u.Z)({left:0,position:"absolute",transform:"scale(0)",transition:o.transitions.create("transform",{easing:o.transitions.easing.easeIn,duration:o.transitions.duration.shortest})},n.checked&&{transform:"scale(1)",transition:o.transitions.create("transform",{easing:o.transitions.easing.easeOut,duration:o.transitions.duration.shortest})})}));var J=function(e){var o=e.checked,n=void 0!==o&&o,t=e.classes,r=void 0===t?{}:t,a=e.fontSize,i=(0,u.Z)({},e,{checked:n});return(0,w.jsxs)(W,{className:r.root,ownerState:i,children:[(0,w.jsx)(G,{fontSize:a,className:r.background,ownerState:i}),(0,w.jsx)(U,{fontSize:a,className:r.dot,ownerState:i})]})},Q=n(3209);var X=r.createContext(void 0);function Y(e){return(0,k.Z)("MuiRadio",e)}var $=(0,S.Z)("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),ee=["checked","checkedIcon","color","icon","name","onChange","size","className"],oe=(0,x.ZP)(I,{shouldForwardProp:function(e){return(0,x.FO)(e)||"classes"===e},name:"MuiRadio",slot:"Root",overridesResolver:function(e,o){var n=e.ownerState;return[o.root,o["color".concat((0,v.Z)(n.color))]]}})((function(e){var o=e.theme,n=e.ownerState;return(0,u.Z)({color:(o.vars||o).palette.text.secondary},!n.disableRipple&&{"&:hover":{backgroundColor:o.vars?"rgba(".concat("default"===n.color?o.vars.palette.action.activeChannel:o.vars.palette[n.color].mainChannel," / ").concat(o.vars.palette.action.hoverOpacity,")"):(0,f.Fq)("default"===n.color?o.palette.action.active:o.palette[n.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==n.color&&(0,s.Z)({},"&.".concat($.checked),{color:(o.vars||o).palette[n.color].main}),(0,s.Z)({},"&.".concat($.disabled),{color:(o.vars||o).palette.action.disabled}))}));var ne=(0,w.jsx)(J,{checked:!0}),te=(0,w.jsx)(J,{}),re=r.forwardRef((function(e,o){var n,t,a,i,c=(0,P.Z)({props:e,name:"MuiRadio"}),l=c.checked,s=c.checkedIcon,f=void 0===s?ne:s,m=c.color,x=void 0===m?"primary":m,g=c.icon,Z=void 0===g?te:g,b=c.name,S=c.onChange,k=c.size,y=void 0===k?"medium":k,j=c.className,C=(0,d.Z)(c,ee),z=(0,u.Z)({},c,{color:x,size:y}),I=function(e){var o=e.classes,n=e.color,t=e.size,r={root:["root","color".concat((0,v.Z)(n)),"medium"!==t&&"size".concat((0,v.Z)(t))]};return(0,u.Z)({},o,(0,h.Z)(r,Y,o))}(z),R=r.useContext(X),M=l,N=(0,Q.Z)(S,R&&R.onChange),B=b;return R&&("undefined"===typeof M&&(a=R.value,M="object"===typeof(i=c.value)&&null!==i?a===i:String(a)===String(i)),"undefined"===typeof B&&(B=R.name)),(0,w.jsx)(oe,(0,u.Z)({type:"radio",icon:r.cloneElement(Z,{fontSize:null!=(n=te.props.fontSize)?n:y}),checkedIcon:r.cloneElement(f,{fontSize:null!=(t=ne.props.fontSize)?t:y}),ownerState:z,classes:I,name:B,checked:M,onChange:N,ref:o,className:(0,p.Z)(I.root,j)},C))}));var ae=function(){var e=r.useState("a"),o=(0,m.Z)(e,2),n=o[0],a=o[1],i=function(e){a(e.target.value)},c=function(e){return{checked:n===e,onChange:i,value:e,name:"size-radio-button-demo",inputProps:{"aria-label":e}}};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(re,(0,t.Z)((0,t.Z)({},c("e")),{},{sx:{color:D.gt.main.info,"& .MuiSvgIcon-root":{fontSize:28},"&.Mui-checked":{color:D.gt.main.info}}})),(0,w.jsx)(re,(0,t.Z)((0,t.Z)({},c("f")),{},{sx:{color:D.gt.main.info,"& .MuiSvgIcon-root":{fontSize:28},"&.Mui-checked":{color:D.gt.main.info}}})),(0,w.jsx)(re,(0,t.Z)((0,t.Z)({},c("g")),{},{sx:{color:D.gt.main.info,"& .MuiSvgIcon-root":{fontSize:28},"&.Mui-checked":{color:D.gt.main.info}}})),(0,w.jsx)(re,(0,t.Z)((0,t.Z)({},c("h")),{},{sx:{color:D.gt.main.info,"& .MuiSvgIcon-root":{fontSize:28},"&.Mui-checked":{color:D.gt.main.info}}}))]})};var ie=function(e){var o=e.label,n=e.labelColor,t=e.toggleColor,a=(0,r.useState)(!0),i=(0,m.Z)(a,2),c=i[0],l=i[1];return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("label",{className:"relative inline-flex items-center mr-5 cursor-pointer select-none",children:[(0,w.jsx)("input",{type:"checkbox",value:"",className:"sr-only peer",checked:c,onChange:function(){l(!c)}}),(0,w.jsx)("div",{className:"w-14 h-8 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-1 after:left-1\n                after:bg-white after:border-gray-300 after:border after:rounded-full \n                after:h-6 after:w-6 after:transition-all peer peer-checked:after:translate-x-full \n                peer-checked:after:border-white ",style:{backgroundColor:c?"".concat(t):""}}),(0,w.jsx)("span",{className:"ml-3 text-xl font-medium",style:{color:n},children:o})]})})};var ce=function(){return(0,w.jsx)(a.Z,{children:(0,w.jsxs)(i.Z,{sx:{display:"flex",flexDirection:"column",flexWrap:"wrap",gap:"20px"},children:[(0,w.jsxs)(i.Z,{component:c.Z,sx:{padding:"12px",width:"max-content"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.Sub_Title),children:" Checkbox: "}),(0,w.jsxs)(i.Z,{sx:{marginTop:"12px",display:"flex",flexWrap:"wrap",alignItems:"center",gap:"12px",width:"500px"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.List_Title),children:" Actived: "}),(0,w.jsx)(K,{color:D.gt.main.primary,width:"30px"}),(0,w.jsx)(K,{color:D.gt.main.info,width:"30px"}),(0,w.jsx)(K,{color:D.gt.main.success,width:"30px"}),(0,w.jsx)(K,{color:D.gt.main.warning,width:"30px"}),(0,w.jsx)(K,{color:D.gt.main.error,width:"30px"})]}),(0,w.jsxs)(i.Z,{sx:{marginTop:"12px",display:"flex",flexWrap:"wrap",alignItems:"center",gap:"12px",width:"500px"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.List_Title),children:" Disabled: "}),(0,w.jsx)(K,{color:D.gt.main.error,width:"30px",isDisabled:!0})]})]}),(0,w.jsxs)(i.Z,{component:c.Z,sx:{padding:"12px",width:"max-content"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.Sub_Title),children:" Toggle: "}),(0,w.jsxs)(i.Z,{sx:{marginTop:"12px",display:"flex",flexWrap:"wrap",alignItems:"center",rowGap:"10px",width:"500px"},children:[(0,w.jsx)(ie,{label:"label",labelColor:D.gt.main.primary,toggleColor:D.gt.main.primary}),(0,w.jsx)(ie,{label:"label",labelColor:D.gt.main.info,toggleColor:D.gt.main.info}),(0,w.jsx)(ie,{label:"label",labelColor:D.gt.main.success,toggleColor:D.gt.main.success}),(0,w.jsx)(ie,{label:"label",labelColor:D.gt.main.warning,toggleColor:D.gt.main.warning}),(0,w.jsx)(ie,{label:"label",labelColor:D.gt.main.error,toggleColor:D.gt.main.error})]})]}),(0,w.jsxs)(i.Z,{component:c.Z,sx:{padding:"12px",width:"max-content"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.Sub_Title),children:" Radio: "}),(0,w.jsxs)(i.Z,{sx:{marginTop:"12px",display:"flex",alignItems:"center",gap:"12px",width:"500px"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.List_Title),children:" Actived: "}),(0,w.jsx)(ae,{})]}),(0,w.jsxs)(i.Z,{sx:{marginTop:"12px",display:"flex",alignItems:"center",gap:"12px",width:"500px"},children:[(0,w.jsx)("span",{style:(0,t.Z)({},l.K.List_Title),children:" Disabled: "}),(0,w.jsx)(re,{disabled:!0,sx:{color:"gray","& .MuiSvgIcon-root":{fontSize:28},"&.Mui-checked":{color:"gray"}}})]})]})]})})}},3209:function(e,o,n){n.d(o,{Z:function(){return t}});var t=function(){for(var e=arguments.length,o=new Array(e),n=0;n<e;n++)o[n]=arguments[n];return o.reduce((function(e,o){return null==o?e:function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];e.apply(this,t),o.apply(this,t)}}),(function(){}))}},9201:function(e,o,n){n.d(o,{Z:function(){return Z}});var t=n(7462),r=n(2791),a=n(3366),i=n(3733),c=n(4419),l=n(4036),s=n(1046),d=n(7630),u=n(5878),p=n(1217);function h(e){return(0,p.Z)("MuiSvgIcon",e)}(0,u.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var f=n(184),m=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],v=(0,d.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:function(e,o){var n=e.ownerState;return[o.root,"inherit"!==n.color&&o["color".concat((0,l.Z)(n.color))],o["fontSize".concat((0,l.Z)(n.fontSize))]]}})((function(e){var o,n,t,r,a,i,c,l,s,d,u,p,h,f=e.theme,m=e.ownerState;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:m.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(o=f.transitions)||null==(n=o.create)?void 0:n.call(o,"fill",{duration:null==(t=f.transitions)||null==(t=t.duration)?void 0:t.shorter}),fontSize:{inherit:"inherit",small:(null==(r=f.typography)||null==(a=r.pxToRem)?void 0:a.call(r,20))||"1.25rem",medium:(null==(i=f.typography)||null==(c=i.pxToRem)?void 0:c.call(i,24))||"1.5rem",large:(null==(l=f.typography)||null==(s=l.pxToRem)?void 0:s.call(l,35))||"2.1875rem"}[m.fontSize],color:null!=(d=null==(u=(f.vars||f).palette)||null==(u=u[m.color])?void 0:u.main)?d:{action:null==(p=(f.vars||f).palette)||null==(p=p.action)?void 0:p.active,disabled:null==(h=(f.vars||f).palette)||null==(h=h.action)?void 0:h.disabled,inherit:void 0}[m.color]}})),x=r.forwardRef((function(e,o){var n=(0,s.Z)({props:e,name:"MuiSvgIcon"}),d=n.children,u=n.className,p=n.color,x=void 0===p?"inherit":p,g=n.component,Z=void 0===g?"svg":g,b=n.fontSize,S=void 0===b?"medium":b,k=n.htmlColor,y=n.inheritViewBox,w=void 0!==y&&y,j=n.titleAccess,C=n.viewBox,z=void 0===C?"0 0 24 24":C,I=(0,a.Z)(n,m),R=r.isValidElement(d)&&"svg"===d.type,M=(0,t.Z)({},n,{color:x,component:Z,fontSize:S,instanceFontSize:e.fontSize,inheritViewBox:w,viewBox:z,hasSvgAsChild:R}),N={};w||(N.viewBox=z);var B=function(e){var o=e.color,n=e.fontSize,t=e.classes,r={root:["root","inherit"!==o&&"color".concat((0,l.Z)(o)),"fontSize".concat((0,l.Z)(n))]};return(0,c.Z)(r,h,t)}(M);return(0,f.jsxs)(v,(0,t.Z)({as:Z,className:(0,i.Z)(B.root,u),focusable:"false",color:k,"aria-hidden":!j||void 0,role:j?"img":void 0,ref:o},N,I,R&&d.props,{ownerState:M,children:[R?d.props.children:d,j?(0,f.jsx)("title",{children:j}):null]}))}));x.muiName="SvgIcon";var g=x;function Z(e,o){function n(n,r){return(0,f.jsx)(g,(0,t.Z)({"data-testid":"".concat(o,"Icon"),ref:r},n,{children:e}))}return n.muiName=g.muiName,r.memo(r.forwardRef(n))}},8278:function(e,o,n){var t=n(8637);o.Z=t.Z},8637:function(e,o,n){n.d(o,{Z:function(){return a}});var t=n(9439),r=n(2791);function a(e){var o=e.controlled,n=e.default,a=(e.name,e.state,r.useRef(void 0!==o).current),i=r.useState(n),c=(0,t.Z)(i,2),l=c[0],s=c[1];return[a?o:l,r.useCallback((function(e){a||s(e)}),[])]}}}]);
//# sourceMappingURL=645.4c3ac415.chunk.js.map