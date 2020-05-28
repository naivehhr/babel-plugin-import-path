module.exports = function ({types:t}) {
  return {
      visitor:{
          ImportDeclaration(path, _ref = { opts: {} }) {
            const specifiers = path.node.specifiers;
            const source = path.node.source;
            const librarys = _ref.opts.library
            librarys.forEach(library => {
                if ( source.value.indexOf(library) !== -1 && (!t.isImportDefaultSpecifier(specifiers[0]))) { 
                  var declarations = specifiers.map((specifier) => {
                      return t.ImportDeclaration(                        
                          [t.importDefaultSpecifier(specifier.local)],
                          t.StringLiteral(`${source.value}/${specifier.local.name}`)
                      )
                  })
                  path.replaceWithMultiple(declarations)
              }
            })
          }
      }
  };
}