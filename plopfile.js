module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "components/{{name}}/index.tsx",
        templateFile: "plop-templates/component.hbs",
      },
      {
        type: "add",
        path: "components/{{name}}/{{name}}.test.tsx",
        templateFile: "plop-templates/test.hbs",
      },
    ],
  })
}
