"use strict";(self.webpackChunkmui_demo=self.webpackChunkmui_demo||[]).push([[647],{4191:function(e,t,r){var n=r(1413),o=r(9439),s=r(2791),a=r(2242),i=r(8683),l=r(3157),c=r(7644),d=r(184);t.Z=function(e){var t=e.label,r=e.placeholder,p=e.type,x=e.iconType,u=e.icon,m=e.position,h=e.message,f=(0,s.useState)(!1),g=(0,o.Z)(f,2),b=g[0],j=g[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("label",{htmlFor:"first_names",className:"flex item-center gap-x-2 m-0",style:(0,n.Z)({},i.K.Input_Label),children:[t,"tooltip"!==x?(0,d.jsx)(l.Z,{widthIcon:"16px",iconColor:a.gt.main.primary,children:u}):(0,d.jsx)(c.Z,{widthIcon:"16px",iconColor:a.gt.main.primary,position:m,message:h}),":"]}),(0,d.jsx)("input",{type:p,id:"first_name",className:" text-gray-900 text-xl  block w-full p-4 d outline-none",placeholder:r,required:!0,style:(0,n.Z)({border:"1px solid ".concat(b?a.gt.main.primary:i.K.Body_Text.color),borderRadius:"4px",boxShadow:"inset 0 1px 2px rgba(0,0,0,.1)"},i.K.Body_Text),onFocus:function(){return j(!0)},onBlur:function(){return j(!1)}})]})}},7644:function(e,t,r){var n=r(1413),o=r(9439),s=r(4554),a=r(2791),i=r(8820),l=r(2242),c=r(8683),d=r(184);t.Z=function(e){var t=e.widthIcon,r=e.iconColor,p=e.position,x=e.message,u=(0,a.useState)(!1),m=(0,o.Z)(u,2),h=m[0],f=m[1],g=(0,a.useState)({opacity:0,transform:"translate(-50%, 0)"}),b=(0,o.Z)(g,2),j=b[0],y=b[1],Z=(0,a.useState)([]),w=(0,o.Z)(Z,2),k=w[0],v=w[1],P=(0,a.useState)(""),_=(0,o.Z)(P,2),C=_[0],S=_[1],T=(0,a.useRef)(null),N=function(e){T.current&&!T.current.contains(e.target)&&f(!1)};return(0,a.useEffect)((function(){return document.addEventListener("mousedown",N),function(){document.removeEventListener("mousedown",N)}}),[]),(0,a.useEffect)((function(){"left"===p?(v(["translate(-25%, 0)","-50% 100%"]),S("25%")):"right"===p?(v(["translate(-75%, 0)","50% 100%"]),S("75%")):(v(["translate(-50%, 0)","0% 100%"]),S("50%"))}),[p]),(0,a.useEffect)((function(){y({opacity:h?1:0,scale:h?"100%":"10%",transform:k[0],transformOrigin:k[1],transition:"all 0.2s ease"})}),[h]),(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(s.Z,{sx:{width:t,aspectRatio:"1",position:"relative","& svg":{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",color:r,cursor:"pointer"}},ref:T,onClick:function(){return f(!h)},children:[(0,d.jsx)(i.KpA,{}),h&&(0,d.jsx)(s.Z,{sx:(0,n.Z)((0,n.Z)((0,n.Z)({position:"absolute",bottom:"calc(100% + 12px)",left:"0px",border:"1px solid ".concat(l.gt.main.primary),maxWidth:"400px",width:"max-content",backgroundColor:l.gt.sidebar.background,borderRadius:"4px",padding:"6px",wordWrap:"break-word"},j),c.K.Caption),{},{"&::after":{content:'""',position:"absolute",top:"100%",left:C,borderTop:"10px solid ".concat(l.gt.main.primary),borderBottom:"0px solid red",borderLeft:"10px solid transparent",borderRight:"10px solid transparent"}}),children:x})]})})}},6647:function(e,t,r){r.r(t),r.d(t,{default:function(){return y}});r(2791);var n=r(9292),o=r(4554),s=r(5527),a=r(1889),i=r(7630),l=r(4191),c=r(9126),d=r(184),p=(0,i.ZP)(s.Z)((function(e){e.theme;return{backgroundColor:"#fff",padding:"12px",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"6px"}}));var x=function(){return(0,d.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,d.jsx)(a.ZP,{item:!0,xs:6,md:8,children:(0,d.jsx)(p,{children:(0,d.jsx)(l.Z,{label:"Username",placeholder:"Melkior",type:"text",iconType:"tooltip",position:"left",message:"A username is the name you want to display to others. It can include letters, numbers, and underscores."})})}),(0,d.jsx)(a.ZP,{item:!0,xs:6,md:4,children:(0,d.jsx)(p,{children:(0,d.jsx)(l.Z,{label:"Password",placeholder:"*****",type:"password",iconType:"tooltip",position:"right",message:"The password should be at least 8 characters long, including both uppercase and lowercase letters, and at least one number or special character."})})}),(0,d.jsx)(a.ZP,{item:!0,xs:6,md:4,children:(0,d.jsx)(p,{children:(0,d.jsx)(l.Z,{label:"Telephone",placeholder:"0989...",type:"number",icon:(0,d.jsx)(c.SPk,{})})})}),(0,d.jsx)(a.ZP,{item:!0,xs:6,md:8,children:(0,d.jsx)(p,{children:(0,d.jsx)(l.Z,{label:"Email",placeholder:"abc@gmail.com",type:"email",iconType:"tooltip",position:"center",message:"Your email address will be used for login and notifications. Make sure the email address you enter is valid"})})})]})},u=r(2242),m=r(8683);var h=function(e){e.label;var t=e.placeholder,r=e.type;return e.icon,(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("input",{type:r,id:"first_name",className:" text-gray-900 text-xl  block w-full p-4 d outline-none",placeholder:t,required:!0,style:{border:"1px solid ".concat(u.gt.main.error),borderRadius:"4px",boxShadow:"inset 0 1px 2px rgba(0,0,0,.1)",color:m.K.Body_Text.color}}),(0,d.jsxs)("p",{className:"mt-2 text-2xl",style:{color:u.gt.main.error},children:[(0,d.jsx)("span",{className:"font-medium",children:"Oh, snapp!"}),"Some error password."]})]})};var f=function(e){e.label;var t=e.placeholder,r=e.type;return e.icon,(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("input",{type:r,id:"first_name",className:" text-gray-900 text-xl  block w-full p-4 d outline-none",placeholder:t,required:!0,style:{border:"1px solid ".concat(u.gt.main.success),borderRadius:"4px",boxShadow:"inset 0 1px 2px rgba(0,0,0,.1)",color:m.K.Body_Text.color}}),(0,d.jsxs)("p",{className:"mt-2 text-2xl",style:{color:u.gt.main.success},children:[(0,d.jsx)("span",{className:"font-medium",children:"Well done!"})," Some success name."]})]})};var g=function(e){e.label;var t=e.placeholder,r=e.type;return e.icon,(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("input",{type:r,id:"first_name",className:" text-gray-900 text-xl  block w-full p-4 d outline-none",placeholder:t,required:!0,style:{border:"1px solid ".concat(u.gt.main.warning),borderRadius:"4px",boxShadow:"inset 0 1px 2px rgba(0,0,0,.1)",color:m.K.Body_Text.color}}),(0,d.jsx)("p",{className:"mt-2 text-2xl",style:{color:u.gt.main.warning},children:"Password is too weak. It should be at least 8 characters long."})]})},b=(0,i.ZP)(s.Z)((function(e){e.theme;return{backgroundColor:"#fff",padding:"12px",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"12px"}}));var j=function(){return(0,d.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,d.jsx)(a.ZP,{item:!0,xs:6,md:12,children:(0,d.jsx)(b,{children:(0,d.jsx)(f,{label:"",placeholder:"",type:"password"})})}),(0,d.jsx)(a.ZP,{item:!0,xs:6,md:12,children:(0,d.jsx)(b,{children:(0,d.jsx)(g,{label:"",placeholder:"",type:"text"})})}),(0,d.jsx)(a.ZP,{item:!0,xs:6,md:12,children:(0,d.jsx)(b,{children:(0,d.jsx)(h,{label:"",placeholder:"",type:"text"})})})]})};var y=function(){return(0,d.jsx)(n.Z,{children:(0,d.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"},children:[(0,d.jsx)(o.Z,{sx:{width:"60%",display:"flex",padding:"24px",borderRadius:"8px",backgroundColor:"#fff"},children:(0,d.jsx)(x,{})}),(0,d.jsx)(o.Z,{sx:{width:"60%",display:"flex",padding:"24px",borderRadius:"8px",backgroundColor:"#fff"},children:(0,d.jsx)(j,{})})]})})}}}]);
//# sourceMappingURL=647.dcaf79e1.chunk.js.map