# Npm Packages

This monorepo is a collection of npm packages that will be published automatically when there are changes within a certain subfolder.

## Packages

 * [common](common/README.md)
 * [request](request/README.md)
 * [translate](translate/README.md)
   

## Versioning

To version a package from this monorepo execute to following command:
```
npm version {type} -w {workspace} -m "{message}"
```
**type**
patch - for a fix
minor - for a new feature without breaking change
major - for a breaking change

**workspace**
The folder name of the package. ex `translate` for the translate package.

**message**
A message of what changed in the release.


Example:
```
npm version patch -w translate -m "Fixed an issue in the translate package"
```

This will:
 * Adjust the package.json version accodingly of the **type**
 * While git push it will publish the new version on the npm registry 


