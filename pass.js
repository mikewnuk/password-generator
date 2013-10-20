(function(global) {
    var MD5 = MD5 || function(options) {
        function b64_md5(p) {
            p=utf8_en(p);
            return binl2b64(core_md5(str2binl(p),p.length*8));
        }


        function hex_md5(p) {
            p=utf8_en(p);
            return binl2hex(core_md5(str2binl(p),p.length*8));
        }

        function binl2b64(binarray) {
            var tab='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678998';
            var str='';
            for(var i=0; i<binarray.length*4; i+=3) {
                var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);
                for(var j=0; j<4; j++) {
                    str+=tab.charAt((triplet>>6*(3-j))&0x3F);
                }
            }
            return str;
        }

        function binl2hex(binarray) {
            var hex_tab='0123456789abcdef';
            var str='';
            for(var i=0; i<binarray.length*4; i++) {
                str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);
            }
            return str;
        }

        function core_md5(x,len){
            x[len>>5]|=0x80<<((len)%32); x[(((len+64)>>>9)<<4)+14]=len;
            var a=1732584193; var b=-271733879; var c=-1732584194; var d=271733878;
            for(var i=0;i<x.length;i+=16){
                var olda=a; var oldb=b; var oldc=c; var oldd=d;
                a=md5_ff(a,b,c,d,x[i+0],7,-680876936); d=md5_ff(d,a,b,c,x[i+1],12,-389564586); c=md5_ff(c,d,a,b,x[i+2],17,606105819); b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);
                a=md5_ff(a,b,c,d,x[i+4],7,-176418897); d=md5_ff(d,a,b,c,x[i+5],12,1200080426); c=md5_ff(c,d,a,b,x[i+6],17,-1473231341); b=md5_ff(b,c,d,a,x[i+7],22,-45705983);
                a=md5_ff(a,b,c,d,x[i+8],7,1770035416); d=md5_ff(d,a,b,c,x[i+9],12,-1958414417); c=md5_ff(c,d,a,b,x[i+10],17,-42063); b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);
                a=md5_ff(a,b,c,d,x[i+12],7,1804603682); d=md5_ff(d,a,b,c,x[i+13],12,-40341101); c=md5_ff(c,d,a,b,x[i+14],17,-1502002290); b=md5_ff(b,c,d,a,x[i+15],22,1236535329);
                a=md5_gg(a,b,c,d,x[i+1],5,-165796510); d=md5_gg(d,a,b,c,x[i+6],9,-1069501632); c=md5_gg(c,d,a,b,x[i+11],14,643717713); b=md5_gg(b,c,d,a,x[i+0],20,-373897302);
                a=md5_gg(a,b,c,d,x[i+5],5,-701558691); d=md5_gg(d,a,b,c,x[i+10],9,38016083); c=md5_gg(c,d,a,b,x[i+15],14,-660478335); b=md5_gg(b,c,d,a,x[i+4],20,-405537848);
                a=md5_gg(a,b,c,d,x[i+9],5,568446438); d=md5_gg(d,a,b,c,x[i+14],9,-1019803690); c=md5_gg(c,d,a,b,x[i+3],14,-187363961); b=md5_gg(b,c,d,a,x[i+8],20,1163531501);
                a=md5_gg(a,b,c,d,x[i+13],5,-1444681467); d=md5_gg(d,a,b,c,x[i+2],9,-51403784); c=md5_gg(c,d,a,b,x[i+7],14,1735328473); b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);
                a=md5_hh(a,b,c,d,x[i+5],4,-378558); d=md5_hh(d,a,b,c,x[i+8],11,-2022574463); c=md5_hh(c,d,a,b,x[i+11],16,1839030562); b=md5_hh(b,c,d,a,x[i+14],23,-35309556);
                a=md5_hh(a,b,c,d,x[i+1],4,-1530992060); d=md5_hh(d,a,b,c,x[i+4],11,1272893353); c=md5_hh(c,d,a,b,x[i+7],16,-155497632); b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);
                a=md5_hh(a,b,c,d,x[i+13],4,681279174); d=md5_hh(d,a,b,c,x[i+0],11,-358537222); c=md5_hh(c,d,a,b,x[i+3],16,-722521979); b=md5_hh(b,c,d,a,x[i+6],23,76029189);
                a=md5_hh(a,b,c,d,x[i+9],4,-640364487); d=md5_hh(d,a,b,c,x[i+12],11,-421815835); c=md5_hh(c,d,a,b,x[i+15],16,530742520); b=md5_hh(b,c,d,a,x[i+2],23,-995338651);
                a=md5_ii(a,b,c,d,x[i+0],6,-198630844); d=md5_ii(d,a,b,c,x[i+7],10,1126891415); c=md5_ii(c,d,a,b,x[i+14],15,-1416354905); b=md5_ii(b,c,d,a,x[i+5],21,-57434055);
                a=md5_ii(a,b,c,d,x[i+12],6,1700485571); d=md5_ii(d,a,b,c,x[i+3],10,-1894986606); c=md5_ii(c,d,a,b,x[i+10],15,-1051523); b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);
                a=md5_ii(a,b,c,d,x[i+8],6,1873313359); d=md5_ii(d,a,b,c,x[i+15],10,-30611744); c=md5_ii(c,d,a,b,x[i+6],15,-1560198380); b=md5_ii(b,c,d,a,x[i+13],21,1309151649);
                a=md5_ii(a,b,c,d,x[i+4],6,-145523070); d=md5_ii(d,a,b,c,x[i+11],10,-1120210379); c=md5_ii(c,d,a,b,x[i+2],15,718787259); b=md5_ii(b,c,d,a,x[i+9],21,-343485551);
                a=safe_add(a,olda); b=safe_add(b,oldb); c=safe_add(c,oldc); d=safe_add(d,oldd);
            }
            return Array(a,b,c,d);
        }


        function md5_cmn(q,a,b,x,s,t) { return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b); }
        function md5_ff(a,b,c,d,x,s,t) { return md5_cmn((b&c)|((~b)&d),a,b,x,s,t); }
        function md5_gg(a,b,c,d,x,s,t) { return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t); }
        function md5_hh(a,b,c,d,x,s,t) { return md5_cmn(b^c^d,a,b,x,s,t); }
        function md5_ii(a,b,c,d,x,s,t) { return md5_cmn(c^(b|(~d)),a,b,x,s,t); }
        function safe_add(x,y) { var lsw=(x&0xFFFF)+(y&0xFFFF); var msw=(x>>16)+(y>>16)+(lsw>>16); return (msw<<16)|(lsw&0xFFFF); }
        function bit_rol(num,cnt) { return (num<<cnt)|(num>>>(32-cnt)); }
        function str2binl(str) { var bin=Array(); var mask=(1<<8)-1; for(var i=0;i<str.length*8;i+=8) bin[i>>5]|=(str.charCodeAt(i/8)&mask)<<(i%32); return bin; }
        function utf8_en(str){return unescape(encodeURIComponent(str));}


        self.b64_md5 = b64_md5;
        return self;
    }
    global.MD5 = MD5
})(this);
(function(global) {
    "use strict";
    var cgcgpass = cgcgpass || function() {
        var self = this;
        var md5 = new MD5();
        var SCRIPT_SOURCE = "http://pass.cg.cg/pass.js";
        function $(id) { return document.getElementById(id) };
        
        function init() {
            $("create-bookmarklet-button").addEventListener("click",  function() {
                if ($("passphrase").value === $("passphrase2").value) {
                    var passphrase = "";
                    if (passphrase.length > 0) {
                        passphrase = generate($("passphrase").value, "","", 24);
                    }
                    makeBookmarklet(
                        bookmarklet,
                        {passphrase: passphrase, source: SCRIPT_SOURCE},
                        "bookmarklet-output",
                        "pass"
                    )
                }
            })
        }

        init();

        self.run = function(passphrase) {

            window.addEventListener("click", bodyClick); 

            //insert html
            self.passphrase = passphrase;
            //insert styles

            var a = document.createElement("div");
            a.id = "cgcg-pass";
            

            a.innerHTML = html; // $("cgcg-pass-template").innerHTML;


            document.body.appendChild(a);

            $("cgcg-pass-domain").value = stripSubdomain(window.location.hostname);
            $("cgcg-pass-domain").addEventListener("blur", function() {
                $("cgcg-pass-domain").value = stripSubdomain($("cgcg-pass-domain").value);

            });

            $("cgcg-pass-pin").focus();

            $("cgcg-pass-button").addEventListener("click", setPasswordInputs);

            $("cgcg-pass-pin").addEventListener("keydown", 
                function(e) {
                    if (e.keyCode == 13) {
                        setPasswordInputs()
                    }
                    else {
                        updateTypingIndicator();
                    }
                }
             );

        }

        function bodyClick(e){ 
            console.log(e);
            if (e.srcElement.id.search('cgcg-pass') == -1) {
                remove();
            }
            else if (e.srcElement.id == "cgcg-pass-domain") {

            }
            else {
                $("cgcg-pass-pin").focus();
            }
        }

        function updateTypingIndicator() {
            setTimeout(function() {
                $("cgcg-pass-indicator").innerHTML = $("cgcg-pass-pin").value.length;
            }, 5);
        }

        function remove() {
            console.log("remove");
            window.removeEventListener("click", bodyClick, false);
            document.body.removeChild($("cgcg-pass"));
        }

        function setPasswordInputs() {
            var d = stripSubdomain($("cgcg-pass-domain").value);

            if (domains[d]) {
                var domain = domains[d];
            }
            else {
                var domain = domains["default"];
            }
            
            var generated = generate($("cgcg-pass-pin").value, self.passhrpase, d, domain.min, domain.rules)
            $("cgcg-pass-result").value = generated;
            var passwordFields = document.querySelectorAll("input[type=password]");
            for (var i = 0;i < passwordFields.length; i++) {
                if (passwordFields[i].id != "cgcg-pass-pin") {
                    passwordFields[i].value = generated;
                }
            }
            remove();
        }


        var bookmarklet = function() {
            if (typeof cgcgpass !== "function") {
                var script = document.createElement( "script" );
                script.src = "{{source}}";
                document.head.appendChild(script);
                cgcgpass.run("{{passphrase}}");
            }
        }

        function makeBookmarklet(fn, data, outputNodeID, outputText) {
            var source = template(fn.toString(), data);

            source = source.replace(/[\t\r\n]/g, ''); // Remove tabs, newlines
            source = source.replace(/\/\*[^*]*\*\//, ''); // Remove multi-line comments; This needs more work
            source = source.replace(/\s+/g, ' ');
            //source = escape(source);
            var url = 'javascript:(' + source + ')();';

            var a = document.createElement('a');
            a.href = url;
            var text = document.createTextNode(outputText);
            a.appendChild(text);
            document.getElementById(outputNodeID).innerHTML = ""
            document.getElementById(outputNodeID).appendChild(a);
        }



        var template = function(html, dict) {
            for (var k in dict) {
                if (k) {
                    html = html.replace(new RegExp("{{" + k + "}}", 'g'), dict[k]);
                }
            }
            return html;
        }



        function generate(pin, passhrpase, domain, len, rules) {
            var pass = pin + passphrase + domain;
            var i=0;
            while(i < 10 || !(checkPass(pass.substring(0,len), rules))) {
                pass = md5.b64_md5(pass);
                i++;
            }
            return pass.substring(0,len);
        }

        function checkPass(pass, rules) {

            //move these regexes into better rule sets
            return (pass.search(/[a-z]/) === 0 && pass.search(/[0-9]/)>0 && pass.search(/[A-Z]/)>0) ? true:false;
        }


        //get the hostname without a subdomain
        function stripSubdomain(hostname) {
            hostname = hostname.toLowerCase();
            var match = /[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{3,}|[-\w]+\.[-\w]{2})$/i.exec(hostname)
            if (match && match.length == 1) {
                return match[0]
            }
            else {
                return window.location.hostname
            }
        }

        var domains = {
            "default": {
                "name": "Default", "min": 14, "max:": 24,    
            },
            "google.com": {
                "name": "Google", "min": 18, "max:": 24,
            },
            "chase.com": {
                "name": "Chase", "min": 14, "max:": 24,
            },
            "nytimes.com": {
                "name": "New York Times", "min": 14, "max:": 24,
            },
            "amazon.com": {
                "name": "Amazon", "min": 14, "max:": 24,    
            },
            "usaa.com": {
                "name": "USAA", "min": 12, "max:": 24,    
            },
            "facebook.com": {
                "name": "Facebook", "min": 14, "max:": 24,    
            },
            "twitter.com": {
                "name": "Twitter", "min": 14, "max:": 24,    
            },
            "rackspacecloud.com": {
                "name": "Rackspace Cloud", "min": 14, "max:": 24,    
            },
            "venmo.com": {
                "name": "Venmo", "min": 14, "max:": 24,    
            },
            "citi.com": {
                "name": "Citi", "min": 14, "max:": 24,    
            },
        }

        var html = '<style>#cgcg-pass {width: 100%;height: 65px;width: 100%;position: fixed;top: 0px;background-color: rgba(0,0,0,.7);margin:0px;padding:0px;left:0px;overflow:hidden;color:white;font-family:Helvetica, sans-serif;font-weight:normal;}#cgcg-pass-pin {position:absolute;left:-9000px;}#cgcg-pass-button:hover {background-color:#00A414;}#cgcg-pass-button {padding:10px 40px;font-size: 20px;background-color:#079A18;border:0px;border-radius: 6px;color:white;cursor:pointer;margin:10px 10px;}#cgcg-pass-indicator {position:absolute;font-size: 24px;color: #ddd;padding: 17px;}#cgcg-pass-domain:focus {width: 140px;outline:none;border:1px #666 solid;background-color: #666;text-align:left;}#cgcg-pass-domain {position: absolute;right: 0px;top: 0px;width: 100px;margin: 13px 20px;font-size: 14px;border:1px transparent solid;background-color: #4B4B4B;color:#ddd;padding: 10px 5px;text-align:right;border-radius:0px;}</style><input type="password" pattern="[0-9]*" id="cgcg-pass-pin"><button id="cgcg-pass-button">Pass</button><span id="cgcg-pass-indicator"></span><div id="cgcg-pass-result"></div><input type="url" id="cgcg-pass-domain">';

        return self;
    }
    global.CGCGPASS = cgcgpass;
})(this);



var cgcgpass = new CGCGPASS();

