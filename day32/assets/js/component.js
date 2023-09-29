class F8 {
  static component(name, option) {
    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          if (option.data) {
            const data = option.data();
            Object.keys(data).forEach((key) => {
              window[key] = data[key];
            });
          }
          if (option.template) {
            const template = option.template;
            const regex = template.match(/{{.+?}}/g);
            const regexArr = [];
            regex?.forEach((value) => {
              const variableResult = value.match(/{{(.+?)}}/);
              regexArr.push(variableResult[1].trim());
            });
            var replaceTemplate = template;
            regexArr.forEach((key) => {
              replaceTemplate = replaceTemplate.replace(
                /{{.+?}}/,
                `${window[key]}`
              );
            });

            const templateEle = document.createElement("template");
            templateEle.innerHTML = replaceTemplate;
            const templateNode = templateEle.content.cloneNode(true);
            const btnCounts = templateNode.querySelectorAll("button");
            const countNumber = templateNode.querySelector(".count");
            const h1 = templateNode.querySelector("h1");
            btnCounts.forEach((btn) => {
              const nameAttribute = btn.getAttributeNames();
              const nameEvent = nameAttribute[0].split("v-on:");
              const btnEvent = nameEvent[1];
              const btnAttribute = btn.getAttribute(`v-on:${btnEvent}`);
              btn.addEventListener(btnEvent, () => {
                if (btnAttribute === "count--") {
                  countNumber.innerText = --count;
                }
                if (btnAttribute === "count++") {
                  countNumber.innerText = ++count;
                }
                if (btnAttribute.includes("title=")) {
                  const contentTitle = btnAttribute.split("title=");
                  h1.innerText = contentTitle[1];
                }
              });
            });
            this.append(templateNode);
          }
        }
      }
    )
  }
}