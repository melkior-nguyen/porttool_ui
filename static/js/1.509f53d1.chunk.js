"use strict";(self.webpackChunkmui_demo=self.webpackChunkmui_demo||[]).push([[1],{4191:function(e,t,n){var i=n(1413),r=n(9439),o=n(2791),s=n(2242),a=n(8683),l=n(3157),c=n(7644),d=n(184);t.Z=function(e){var t=e.label,n=e.placeholder,x=e.type,p=e.iconType,u=e.icon,m=e.position,h=e.message,f=(0,o.useState)(!1),g=(0,r.Z)(f,2),j=g[0],Z=g[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("label",{htmlFor:"first_names",className:"flex item-center gap-x-2 m-0",style:(0,i.Z)({},a.K.Input_Label),children:[t,"tooltip"!==p?(0,d.jsx)(l.Z,{widthIcon:"16px",iconColor:s.gt.main.primary,children:u}):(0,d.jsx)(c.Z,{widthIcon:"16px",iconColor:s.gt.main.primary,position:m,message:h}),":"]}),(0,d.jsx)("input",{type:x,id:"first_name",className:" text-gray-900 text-xl  block w-full p-4 d outline-none",placeholder:n,required:!0,style:(0,i.Z)({border:"1px solid ".concat(j?s.gt.main.primary:a.K.Body_Text.color),borderRadius:"4px",boxShadow:"inset 0 1px 2px rgba(0,0,0,.1)"},a.K.Body_Text),onFocus:function(){return Z(!0)},onBlur:function(){return Z(!1)}})]})}},7644:function(e,t,n){var i=n(1413),r=n(9439),o=n(4554),s=n(2791),a=n(8820),l=n(2242),c=n(8683),d=n(184);t.Z=function(e){var t=e.widthIcon,n=e.iconColor,x=e.position,p=e.message,u=(0,s.useState)(!1),m=(0,r.Z)(u,2),h=m[0],f=m[1],g=(0,s.useState)({opacity:0,transform:"translate(-50%, 0)"}),j=(0,r.Z)(g,2),Z=j[0],b=j[1],y=(0,s.useState)([]),w=(0,r.Z)(y,2),v=w[0],C=w[1],k=(0,s.useState)(""),S=(0,r.Z)(k,2),_=S[0],T=S[1],P=(0,s.useRef)(null),I=function(e){P.current&&!P.current.contains(e.target)&&f(!1)};return(0,s.useEffect)((function(){return document.addEventListener("mousedown",I),function(){document.removeEventListener("mousedown",I)}}),[]),(0,s.useEffect)((function(){"left"===x?(C(["translate(-25%, 0)","-50% 100%"]),T("25%")):"right"===x?(C(["translate(-75%, 0)","50% 100%"]),T("75%")):(C(["translate(-50%, 0)","0% 100%"]),T("50%"))}),[x]),(0,s.useEffect)((function(){b({opacity:h?1:0,scale:h?"100%":"10%",transform:v[0],transformOrigin:v[1],transition:"all 0.2s ease"})}),[h]),(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(o.Z,{sx:{width:t,aspectRatio:"1",position:"relative","& svg":{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",color:n,cursor:"pointer"}},ref:P,onClick:function(){return f(!h)},children:[(0,d.jsx)(a.KpA,{}),h&&(0,d.jsx)(o.Z,{sx:(0,i.Z)((0,i.Z)((0,i.Z)({position:"absolute",bottom:"calc(100% + 12px)",left:"0px",border:"1px solid ".concat(l.gt.main.primary),maxWidth:"400px",width:"max-content",backgroundColor:l.gt.sidebar.background,borderRadius:"4px",padding:"6px",wordWrap:"break-word"},Z),c.K.Caption),{},{"&::after":{content:'""',position:"absolute",top:"100%",left:_,borderTop:"10px solid ".concat(l.gt.main.primary),borderBottom:"0px solid red",borderLeft:"10px solid transparent",borderRight:"10px solid transparent"}}),children:p})]})})}},1515:function(e,t,n){var i=n(9439),r=n(4294),o=n(2791),s=n(2242),a=n(184);t.Z=function(e){var t=e.size,n=e.label,l=e.icon,c=e.onClick,d=(0,o.useState)([]),x=(0,i.Z)(d,2),p=x[0],u=x[1],m=(0,o.useState)(""),h=(0,i.Z)(m,2),f=h[0],g=h[1],j=(0,o.useState)(""),Z=(0,i.Z)(j,2),b=Z[0],y=Z[1],w=(0,o.useState)(""),v=(0,i.Z)(w,2),C=v[0],k=v[1],S=(0,o.useState)(""),_=(0,i.Z)(S,2),T=_[0],P=_[1];return(0,o.useEffect)((function(){"small"===t&&(u(["60px","30px","5px 10px","5px"]),g("8px"),P("20px"),k(n)),"medium"===t&&(u(["100px","30px","5px","10px"]),g("10px"),y("16px"),P("3px"),k(n)),"large"===t&&(u(["120px","35px","5px","12px"]),g("12px"),y("20px"),P("3px"),k(n))}),[t]),(0,a.jsxs)(r.Z,{variant:"outlined",sx:{display:"flex",alignItems:"center",gap:"small"!==t?p[3]:"0",minWidth:p[0],maxHeight:p[1],height:"100%",background:"linear-gradient(135deg, ".concat(s.gt.main.primary_gradient," 0%, ").concat(s.gt.main.primary," 100%)"),padding:p[3],"&.MuiButtonBase-root":{borderRadius:T,border:"1px solid ".concat(s.gt.main.primary),color:"".concat(s.ue.text.white),fontSize:f},"&:hover":{"&.MuiButtonBase-root":{background:"linear-gradient(135deg, ".concat(s.gt.main.primary_hover," 0%, ").concat(s.gt.main.primary_hover," 100%)"),color:"".concat(s.ue.text.white)}},"&:active":{transform:"scale(0.98)"}},onClick:c,children:["small"!==t&&void 0!==l&&(0,a.jsx)("div",{style:{fontSize:b},children:l}),C]})}},9722:function(e,t,n){var i=n(9439),r=n(4554),o=n(2791),s=n(8820),a=n(2242),l=(n(3206),n(8683)),c=n(184);t.Z=function(e){var t=e.label,n=e.data,d=(0,o.useState)(!1),x=(0,i.Z)(d,2),p=x[0],u=x[1],m=(0,o.useState)(t),h=(0,i.Z)(m,2),f=h[0],g=h[1],j=(0,o.useRef)(null),Z=function(){u(!p)};return(0,o.useEffect)((function(){var e=function(e){j.current&&!j.current.contains(e.target)&&u(!1)};return window.addEventListener("mousedown",e),function(){window.removeEventListener("mousedown",e)}}),[]),(0,c.jsxs)(r.Z,{ref:j,sx:{minWidth:"100px",width:"100%",minHeight:"30px",display:"flex",alignItems:"center",backgroundColor:a.gt.text.white,border:"1px solid ".concat(l.K.Body_Text.color),borderRadius:"4px",p:"10px",cursor:"pointer",position:"relative"},children:[(0,c.jsx)(r.Z,{sx:{flex:"1",fontSize:"14px",userSelect:"none",color:a.gt.main.primary},onClick:Z,children:"None"===f?t:f}),(0,c.jsx)(r.Z,{onClick:Z,children:(0,c.jsx)(s.i0B,{style:{color:a.gt.main.primary,fontSize:"20px"}})}),(0,c.jsx)(r.Z,{className:p?"dropdown_options active":"dropdown_options",sx:{borderRadius:"4px",overflow:"auto",padding:"6px 0",boxShadow:"1px 1px 1px 0 #acacac40"},children:n.map((function(e,t){return(0,c.jsx)("li",{className:"dropdown_item",children:(0,c.jsx)("span",{style:{color:a.gt.main.primary},onClick:function(){return function(e){u(!1),g(e)}(e)},children:e})},t)}))})]})}},5001:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var i=n(1413),r=(n(2791),n(4554)),o=n(890),s=n(1889),a=n(9292),l=n(2242),c=n(8683),d=n(184);var x=function(e){var t=e.children;return(0,d.jsx)(o.Z,{sx:(0,i.Z)({},c.K.Main_Title),children:t})},p=n(9202),u=n(4191),m=n(9126),h=n(1515),f=n(8820),g=n(3524),j=n(1545),Z=n(6856),b=n(7644),y=n(3157),w=n(9722),v=(0,p.Z)(r.Z)((function(e){e.theme;return{backgroundColor:"#fff",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"6px"}}));var C=function(){return(0,d.jsx)(a.Z,{children:(0,d.jsxs)(r.Z,{sx:{width:"100%",height:"100%",backgroundColor:"#fff",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",border:"1px solid #fff"},children:[(0,d.jsx)(x,{children:"User Profile"}),(0,d.jsxs)(r.Z,{sx:{flex:"2",backgroundColor:"#fff",height:"100%",borderRadius:"16px",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,d.jsxs)(r.Z,{sx:{padding:"24px",display:"flex",gap:"12px",width:"100%"},children:[(0,d.jsx)(o.Z,{sx:(0,i.Z)((0,i.Z)({},c.K.Sub_Title),{},{borderBottom:"2px solid ".concat(l.gt.main.primary),cursor:"pointer"}),children:"Profile"}),(0,d.jsx)(o.Z,{sx:(0,i.Z)((0,i.Z)({},c.K.Sub_Title),{},{cursor:"pointer"}),children:"Avatar"})]}),(0,d.jsxs)(r.Z,{sx:{flex:"1",padding:"24px",display:"flex",flexDirection:"column",border:"1px solid ".concat(c.K.Body_Text.color),borderRadius:"16px",width:"70%"},children:[(0,d.jsx)(o.Z,{sx:(0,i.Z)({},c.K.Sub_Title),children:"Your Profile"}),(0,d.jsx)(r.Z,{sx:{marginTop:"24px"},children:(0,d.jsxs)(s.ZP,{container:!0,spacing:2,children:[(0,d.jsx)(s.ZP,{item:!0,xs:6,md:6,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Full Name",placeholder:"Your name",type:"text",icon:(0,d.jsx)(f.nf1,{})})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:6,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Username",placeholder:"Melkior",type:"text",iconType:"tooltip",position:"right",message:"A username is the name you want to display to others. It can include letters, numbers, and underscores."})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:3,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Password",placeholder:"*****",type:"password",icon:(0,d.jsx)(g.dEW,{})})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:3,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Confirm Password",placeholder:"*****",type:"password",iconType:"tooltip",position:"center",message:"The password should be at least 8 characters long, including both uppercase and lowercase letters, and at least one number or special character."})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:6,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Email",placeholder:"abc@gmail.com",type:"email",icon:(0,d.jsx)(Z.G7V,{})})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:3,children:(0,d.jsxs)(v,{children:[(0,d.jsxs)("label",{htmlFor:"first_names",className:"flex item-center gap-x-2 m-0",style:(0,i.Z)({},c.K.Input_Label),children:["Gender",(0,d.jsx)(y.Z,{widthIcon:"16px",iconColor:l.gt.main.primary,children:(0,d.jsx)(m.vw2,{})}),":"]}),(0,d.jsx)(w.Z,{label:"Male",data:["Male","Female","Other"]})]})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:3,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Zip Code",placeholder:"12345",type:"email",iconType:"tooltip",position:"center",message:"Your email address will be used for login and notifications. Make sure the email address you enter is valid"})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:6,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Address",placeholder:"District...",type:"text",icon:(0,d.jsx)(j.xje,{})})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:6,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Telephone",placeholder:"0989...",type:"number",icon:(0,d.jsx)(m.SPk,{})})})}),(0,d.jsx)(s.ZP,{item:!0,xs:6,md:6,children:(0,d.jsx)(v,{children:(0,d.jsx)(u.Z,{label:"Country",placeholder:"VietName",type:"text",iconType:"tooltip",position:"right",message:"Test message"})})})]})}),(0,d.jsxs)(r.Z,{sx:{width:"100%",display:"flex",justifyContent:"end",alignItems:"center",marginTop:"auto",gap:"6px"},children:[(0,d.jsx)(y.Z,{widthIcon:"16px",iconColor:l.gt.main.primary,children:(0,d.jsx)(b.Z,{message:"Password retrieval",position:"right"})}),(0,d.jsx)(o.Z,{sx:(0,i.Z)({},c.K.Caption),children:"Forgot your password?"})]}),(0,d.jsx)(r.Z,{sx:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"auto"},children:(0,d.jsx)(h.Z,{size:"medium",label:"Update",onClick:function(){alert("Update successfully!")}})})]})]})]})})}},3206:function(){}}]);
//# sourceMappingURL=1.509f53d1.chunk.js.map