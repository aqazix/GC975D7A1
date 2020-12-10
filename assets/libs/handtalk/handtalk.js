var unoesteHandTalk = {

    ht: null,

    init: function () {

        var autoShow = true;

        var scriptHTUnoeste = document.getElementById("scriptHTUnoeste");
        if (scriptHTUnoeste != null) {
            autoShow = scriptHTUnoeste.getAttribute("data-autoshow") != "false";
        }

        if (!autoShow && localStorage.getItem("unoeste.handtalk") != null)
        {
            autoShow = false;
        }

        if (autoShow) {
            unoesteHandTalk.toggleHandTalk(true);
        }

    },

    toggleHandTalk: function (forceAdd) {

        if (forceAdd || unoesteHandTalk.ht == null) {

            var scriptHT = document.createElement("script");
            scriptHT.setAttribute("id", "scriptHT");
            scriptHT.setAttribute('type', 'text/javascript');
            scriptHT.src = "//plugin.handtalk.me/web/latest/handtalk.min.js";
            document.head.appendChild(scriptHT);

            scriptHT.addEventListener('load', function () {

                var maxTextSize = 500;
                var scriptHTUnoeste = document.getElementById("scriptHTUnoeste");

                if (scriptHTUnoeste != null)
                    maxTextSize = scriptHTUnoeste.getAttribute("data-maxtextsize");

                unoesteHandTalk.ht = new HT({
                    token: "4f5dba80be297f9e2c2016454ea7a4d9",
                    maxTextSize: maxTextSize,
                    side:"left",
                    mobileEnabled:"true"
                });

            });

            localStorage.setItem("unoeste.handtalk", "true");
        }
        else
        {
            //unoesteHandTalk.ht.destroy();
            unoesteHandTalk.ht.elem.remove();
            localStorage.removeItem("unoeste.handtalk");
            unoesteHandTalk.ht = null;



        }

    }

}

unoesteHandTalk.init();