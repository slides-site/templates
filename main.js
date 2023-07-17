function addHTML() {
    let el, i, domEl, fileName, xmlHttp;

    /*Iterate all DOM*/
    el = document.getElementsByTagName("*");
    for (i = 0; i < el.length; i++) {
        domEl = el[i];

        /*find the element having w3-include-html attribute*/
        fileName = domEl.getAttribute("w3-include-html");
        if (fileName) {
            if (!fileName.startsWith("/")){
                fileName = `/${fileName}`
            }
            if (!fileName.startsWith("/layouts")) {
                fileName = `/layouts${fileName}`
            }
            if (!fileName.endsWith(".html")){
                if (!fileName.endsWith("/")){
                    fileName += "/"
                }
                fileName += "index.html"
            }

            /*http request with attribute value as file name*/
            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        console.log(this.responseText)
                        domEl.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        domEl.innerHTML = `Slide ${fileName} not found.`;
                    }

                    /* Remove the attribute and invoke the function again*/
                    domEl.removeAttribute("w3-include-html");
                    addHTML();
                }
            }
            xmlHttp.open("GET", fileName, true);
            xmlHttp.send();

            /*function ends*/
            return;
        }
    }
}
addHTML();
