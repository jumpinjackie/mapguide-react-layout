import { TsApiDefinition, Dictionary, TsIdentifiable, TsModuleMember, dict_put, dict_count, dict_keys, dict_get } from "./typedoc-api";

const fs = require('fs');
const hbs = require('handlebars');
const path = require("path");
const apidef: TsApiDefinition = require('../docs_output/latest/api.json');

const referencedTypes: Dictionary<{}> = {};
const allSymbolsById: Dictionary<TsModuleMember> = {};

interface IProject {
  name: string;
  classes: { symbol: TsModuleMember, globalName: string }[];
  types: TsModuleMember[];
}

const project: IProject = {
  name: apidef.name,
  classes: [],
  types: []
};

console.log(`1st pass: Scanning all symbols for browser global APIs`)

// 1st pass: Collect all classes with @browserapi
for (const tsModule of apidef.children) {
  if (!tsModule.children) {
    continue;
  }
  for (const modMember of tsModule.children) {
    dict_put(allSymbolsById, modMember.id, modMember);
    const bapi = modMember.comment?.tags?.find(t => t.tag == "browserapi");
    if (bapi?.text) {
      console.log(`Found: ${bapi.text.trim()}`);
      project.classes.push({ symbol: modMember, globalName: bapi.text.trim() });
    }
    switch (modMember.kindString) {
      case "Class":
      case "Interface":
        {
          if (modMember.children) {
            for (const member of modMember.children) {
              if (member.type?.id) {
                dict_put(referencedTypes, member.type.id, {});
              }
            }
          }
        }
        break;
    }
  }
}

// 2nd pass: Put all other visited types under globals
console.log("2nd pass: Put all other visited types under globals");
console.log(`Processing ${dict_count(referencedTypes)} types`);

const ids = dict_keys(referencedTypes);
for (const id of ids) {
  const sym = dict_get(allSymbolsById, id);
  if (sym) {
    console.log(`Adding to referenced types: ${sym.name}`);
    project.types.push(sym);
  }
}

// Sort the arrays before output
project.classes.sort((a, b) => a.globalName.localeCompare(b.globalName));
project.types.sort((a, b) => a.name.localeCompare(b.name));

// The HTML template to use for our simple docs
const tmpl = `<!DOCTYPE HTML>
<html>
  <head>
    <title>{{project.name}}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
  </head>
  <body style="position:relative" data-spy="scroll" data-target="#navbar-toc" data-offset="20">
    
  <div class="row">
        <div class="col-4">
          <!-- Main TOC -->
          <nav style="position:fixed" id="navbar-toc" class="navbar navbar-light bg-light flex-column">
            <a class="navbar-brand" href="#">{{project.name}}</a>
            <nav style="overflow-y: auto" class="nav nav-pills flex-column">
              <a class="nav-link" href="#classes">Classes</a>
              <nav class="nav nav-pills flex-column">
                {{#each project.classes}}
                  <a class="nav-link ml-3 my-1" href="#class_{{this.symbol.id}}">{{this.globalName}}</a>
                {{/each}}
              </nav>
              <a class="nav-link" href="#types">Types</a>
              <nav class="nav nav-pills flex-column">
                {{#each project.types}}
                  <a class="nav-link ml-3 my-1" href="#type_{{id}}">{{this.name}}</a>
                {{/each}}
              </nav>
            </nav>
          </nav>
        </div>
        <div class="col-8">
          <!-- Main Content -->
          <div>
            <h4 id="classes">Classes</h4>
            {{#each project.classes}}
              <h5 id="class_{{this.symbol.id}}">{{this.globalName}}</h5>
              <p>{{this.symbol.comment.shortText}}</p>
              <p>{{this.symbol.comment.text}}</p>
              <h6>Members</h6>
              <hr />
              {{#each symbol.children}}
                <h6>{{this.name}} ({{this.kindString}})</h6>
              {{/each}}
            {{/each}}
            <h4 id="types">Types</h4>
            {{#each project.types}}
              <h5 id="type_{{id}}">{{this.name}} ({{this.kindString}})</h5>
              <p>{{this.comment.shortText}}</p>
            {{/each}}
          </div>
        </div>
      </div>
    
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>`;

hbs.registerHelper("typeMemberList", function(options: any) {
  const items = options.fn(this);
  let html = `
  <h6>Members</h6>
  <hr />
  `;
  for (const item of items) {
    html += `<h6>${item.name} (${item.kindString})</h6>`;
  }
  return html;
})

// Compile the template with handlebars using our project
// object as context key
const result = hbs.compile(tmpl)({ project });

fs.writeFileSync(path.resolve(__dirname, '../docs_output/latest/browserapi.html'), result);