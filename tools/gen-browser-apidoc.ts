import { TsApiDefinition, Dictionary, TsIdentifiable, TsModuleMember, dict_put, dict_count, dict_keys, dict_get, TsInterface, TsClass, TsFunction, TsVariable, TsTypeReference } from "./typedoc-api";

const fs = require('fs');
const hbs = require('handlebars');
const path = require("path");
const apidef: TsApiDefinition = require('../docs_output/latest/api.json');

const referencedTypes: Dictionary<{}> = {};
const allSymbolsById: Dictionary<TsModuleMember> = {};

interface IProject {
  name: string;
  functions: { symbol: TsFunction, globalName: string }[];
  variables: { symbol: TsVariable, globalName: string }[];
  classes: { symbol: TsClass | TsInterface, globalName: string }[];
  types: TsModuleMember[];
}

const project: IProject = {
  name: apidef.name,
  functions: [],
  variables: [],
  classes: [],
  types: []
};

function visitType(tr: TsTypeReference) {
  if (tr.id) {
    dict_put(referencedTypes, tr.id, {});
  }
  if (tr.types) {
    for (const trt of tr.types) {
      visitType(trt);
    }
  }
  if (tr.typeArguments) {
    for (const trt of tr.typeArguments) {
      visitType(trt);
    }
  }
}

console.log(`1st pass: Scanning all symbols for browser global APIs`)

// 1st pass: Collect all classes with @browserapi
for (const tsModule of apidef.children) {
  if (!tsModule.children) {
    continue;
  }
  for (const modMember of tsModule.children) {
    dict_put(allSymbolsById, modMember.id, modMember);
    /*
    if (modMember.id != 5896) {
      continue;
    }*/
    console.log(`Checking: ${tsModule.name} : ${modMember.name} (${modMember.id}, ${modMember.kindString})`)
    switch (modMember.kindString) {
      case "Class":
      case "Interface":
        {
          const bapi = modMember.comment?.tags?.find(t => t.tag == "browserapi");
          if (bapi?.text) {
            const gn = `${bapi.text.trim()}.${modMember.name}`;
            console.log(`Found Class: ${gn}`);
            project.classes.push({ symbol: modMember, globalName: gn });
          }
          if (modMember.children) {
            for (const member of modMember.children) {
              //console.log(`  Checking member: ${member.name} (${member.kindString})`);
              if (member.type) {
                visitType(member.type);
              }
              if (member.kindString == "Method") {
                if (member.signatures) {
                  for (const sig of member.signatures) {
                    if (sig.parameters) {
                      for (const param of sig.parameters) {
                        visitType(param.type);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        break;
      case "Variable":
        {
          const bapi = modMember.comment?.tags?.find(t => t.tag == "browserapi");
          if (bapi?.text) {
            const gn = `${bapi.text.trim()}.${modMember.name}`;
            console.log(`Found Variable: ${gn}`);
            project.variables.push({ symbol: modMember, globalName: gn });
          }
        }
        break;
      case "Function":
        {
          for (const sig of modMember.signatures) {
            const bapi = sig.comment?.tags?.find(t => t.tag == "browserapi");
            if (bapi?.text) {
              const gn = `${bapi.text.trim()}.${modMember.name}`;
              console.log(`Found Function: ${gn}`);
              project.functions.push({ symbol: modMember, globalName: gn });
              break;
            }
          }
        }
        break;
    }
  }
}

console.log(`1st pass put ${dict_count(allSymbolsById)} types`);

// 2nd pass: Put all other visited types under globals
console.log("2nd pass: Put all other visited types under globals");
console.log(`Processing ${dict_count(referencedTypes)} types`);

const ids = dict_keys(referencedTypes);
for (const id of ids) {
  const sym = dict_get(allSymbolsById, id);
  if (sym) {
    console.log(`Adding to referenced types: ${sym.name}`);
    project.types.push(sym);
  } else {
    console.warn(`Missing referenced type indicated by id: ${id}`);
  }
}

// Sort the arrays before output
project.classes.sort((a, b) => a.globalName.localeCompare(b.globalName));
project.types.sort((a, b) => a.name.localeCompare(b.name));

/**
 * TODO:
 * 
 *  - Display of type alias definition
 *  - Use bootstrap badges to indicate types
 *  - Make the sidebar scrollable somehow
 *  - Add browser API intro description
 *  - Add "scroll to top" feature
 *  - Add more @browserapi annotations to elements we know to be exported to the browser API
 *  - Display @since version
 */

// The HTML template to use for our simple docs
const tmpl = `<!DOCTYPE HTML>
<html>
  <head>
    <title>{{project.name}} browser API reference</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
  </head>
  <body style="position:relative" data-spy="scroll" data-target="#navbar-toc" data-offset="20">
    
  <div class="row">
        <div class="col-4">
          <!-- Main TOC -->
          <nav style="position:fixed" id="navbar-toc" class="navbar navbar-light bg-light flex-column">
            <a class="navbar-brand" href="#">{{project.name}}</a>
            <nav style="overflow-y: auto" class="nav nav-pills flex-column">
              <a class="nav-link" href="#globals">Globals</a>
              <nav class="nav nav-pills flex-column">
                {{#each project.classes}}
                  <a class="nav-link ml-3 my-1" href="#class_{{this.symbol.id}}">{{this.globalName}}</a>
                {{/each}}
                {{#each project.functions}}
                  <a class="nav-link ml-3 my-1" href="#func_{{this.symbol.id}}">{{this.globalName}}</a>
                {{/each}}
                {{#each project.variables}}
                  <a class="nav-link ml-3 my-1" href="#var_{{this.symbol.id}}">{{this.globalName}}</a>
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
            <h3 id="globals">Globals</h3>
            {{#each project.classes}}
              <h5 id="class_{{this.symbol.id}}">{{this.globalName}}</h5>
              <p>{{this.symbol.comment.shortText}}</p>
              <p>{{this.symbol.comment.text}}</p>
              {{> members members=this.symbol.children }}
            {{/each}}
            {{#each project.functions}}
              <h5 id="#func_{{this.symbol.id}}">{{this.globalName}}</h6>
              <div class="card">
                <div class="card-body">
                  {{#each symbol.signatures}}
                  <code class="method-defn">{{this.name}}({{> methodParameters method=.}}): {{> typeRef type=this.type }}</code>
                  <p>{{this.symbol.comment.shortText}}</p>
                  <p>{{this.symbol.comment.text}}</p>
                  {{> parameterDescriptions method=.}}
                  {{/each}}
                </div>
              </div>
            {{/each}}
            {{#each project.variables}}
              <h5 id="var_{{this.symbol.id}}">{{this.globalName}}</h5>
              <div class="card">
                <div class="card-body">
                  <code>{{this.symbol.name}}: {{> typeRef type=this.symbol.type }}</code>
                  <p>{{this.symbol.comment.shortText}}</p>
                  <p>{{this.symbol.comment.text}}</p>
                </div>
              </div>
            {{/each}}
            <h3 id="types">Types</h3>
            {{#each project.types}}
              <h5 id="type_{{id}}">{{this.name}} ({{this.kindString}})</h5>
              <p>{{this.comment.shortText}}</p>
              {{#if children.length}}
              {{> members members=this.children }}
              {{/if}}
            {{/each}}
          </div>
        </div>
      </div>
    
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>`;

hbs.registerPartial("members", `<h6>Members</h6>
<hr />
{{#each members}}
  {{#switch kindString}}
    {{#case "Enumeration member" break=true}}
    <div class="card">
      <div class="card-body">
        <code>{{this.name}}</code>
        <p>{{this.comment.shortText}}</p>
        <p>{{this.comment.text}}</p>
      </div>
    </div>
    {{/case}}
    {{#case "Method" break=true}}
    <div class="card">
      <div class="card-body">
        <h6 class="card-title">{{this.name}}</h6>
        {{#each signatures}}
        <code class="method-defn">{{this.name}}({{> methodParameters method=.}}): {{> typeRef type=this.type }}</code>
        <p>{{this.comment.shortText}}</p>
        <p>{{this.comment.text}}</p>
        {{> parameterDescriptions method=.}}
        {{/each}}
      </div>
    </div>
    {{/case}}
    {{#case "Property" break=true}}
    <div class="card">
      <div class="card-body">
        <h6 class="card-title">{{this.name}}</h6>
        <code>{{this.name}}: {{> typeRef type=this.type }}</code>
        <p>{{this.comment.shortText}}</p>
        <p>{{this.comment.text}}</p>
      </div>
    </div>
    {{/case}}
  {{/switch}}
{{/each}}`);

// Partial to render a type name and link to it if possible
hbs.registerPartial("typeRef", `{{#switch type.type ~}}
  {{#case "reference" break=true ~}}
    {{~#if this.type.typeArguments ~}}
      {{this.type.name}}<{{#each this.type.typeArguments ~}}
        {{~> typeRef type=this ~}}
        {{~#unless @last}}, {{/unless ~}}
      {{~/each ~}}>
    {{~ else ~}}
      {{~#if this.type.id ~}}
      <a href="#type_{{this.type.id}}">{{this.type.name}}</a>
      {{else}}
        {{this.type.name}}
      {{~/if ~}}
    {{~/if ~}}
  {{~/case}}
  {{#case "intrinsic" break=true ~}}
    {{this.type.name}}
  {{~/case}}
  {{#case "union" break=true ~}}
    {{#each this.type.types ~}}
      {{~> typeRef type=this ~}}
      {{~#unless @last}} | {{/unless ~}}
    {{~/each ~}}
  {{~/case}}
  {{#case "intersection" break=true ~}}
    {{#each this.type.types ~}}
      {{~> typeRef type=this ~}}
      {{~#unless @last}} & {{/unless ~}}
    {{~/each ~}}
  {{~/case}}
{{~/switch}}`);
hbs.registerPartial("methodParameters", `{{#each parameters ~}}
  {{~this.name}}: {{> typeRef type=this.type }}
  {{~#unless @last}}, {{/unless ~}}
{{~/each ~}}`);
hbs.registerPartial("parameterDescriptions", `{{#if parameters.length}}
<h6>Parameters:</h6>
<ul>
{{#each parameters ~}}
  <li><code>{{~this.name}}</code>: {{> typeRef type=this.type }} {{#if this.comment.text.length ~}}- {{this.comment.text}}{{~/if~}}</li>
{{~/each ~}}
</ul>
{{/if}}`);

// https://github.com/wycats/handlebars.js/issues/927#issuecomment-200784792

hbs.registerHelper("switch", function (value: any, options: any) {
  this._switch_value_ = value;
  var html = options.fn(this); // Process the body of the switch block
  delete this._switch_value_;
  return html;
});

hbs.registerHelper("case", function (value: any, options: any) {
  if (value == this._switch_value_) {
    return options.fn(this);
  }
});

// Compile the template with handlebars using our project
// object as context key
const result = hbs.compile(tmpl)({ project });

fs.writeFileSync(path.resolve(__dirname, '../docs_output/latest/browserapi.html'), result);

// Dump the project out to JSON for template debugging (eg. Why is my API not showing in documentation?)
fs.writeFileSync(path.resolve(__dirname, '../docs_output/latest/project-scan-debug.json'), JSON.stringify({ 
  allSymbolsById,
  referenced: dict_keys(referencedTypes)
}, null, 4));
fs.writeFileSync(path.resolve(__dirname, '../docs_output/latest/generated-project.json'), JSON.stringify(project, null, 4));