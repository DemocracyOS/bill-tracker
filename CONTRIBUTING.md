### Reporting bugs / Requesting features

For practical reasons we only accept issues that are bug reports or feature requests. Make sure to read the following guidelines before opening new issues.

#### Avoid duplication

You'd help us out a lot by first checking if someone else has reported the same issue. Moreover, the issue may have already been resolved with a fix available.

#### Help us help you

Share as much information as possible. Include operating system and version, browser and version, version of Bill Tracker. Also include steps to reproduce the bug and any logs from browser and/or process whenever possible.


### Pull requests

To contribute code, start by forking our repo on github. You'll get something like this:
```
https://github.com/user/bill-tracker
```

Then clone your fork:
```
git clone git@github.com:user/bill-tracker && cd bill-tracker/
```

Add the official repo as a remote, to track changes:
```
git remote add upstream git@github.com:DemocracyOS/bill-tracker.git
```

Create a new branch for the changes you are going to contribute, with a relevant name. Some examples:
```
git checkout -b feature/some-new-stuff
git checkout -b fix/some-bug 
git checkout -b remove/some-file
```

Hack your changes: (you don't need to actually run this)
```
vim somefile.txt
git add somefile.txt
git commit -a -m "adding somefile.txt"
```

When you think your code is ready, prepare for pushing the code by first getting the changes from the main repo:
```
git pull --rebase upstream development
```
(You may need to solve any conflicts from the rebase at this point)

After that you can push the changes to your fork, by doing:
```
git push origin feature/some-new-stuff
git push origin fix/some-bug
```

Finally go to `https://github.com/DemocracyOS/bill-tracker` in the browser and issue a new pull request. Github normally recognizes you have pending changes in a new branch and will suggest creating the pull request.

Main contributors will review your code and possibly ask for changes before your code is pulled in to the main repository. We appreciate your time and efforts!

#### General guidelines

* Do not make a pull request withouth having run the app on your own. This means, you have to manually test (at least) that everything works.
* Try not to pollute your pull request with unintended changes. Keep them simple and small.
* Pull requests should always be against the `development` branch, never against `master`.
* All pull requests must comply with the project's coding styles explained here.


### Coding style

#### GIT conventions
In general terms, we agree with almost everything said in this [blog post about GIT conventions](https://medium.com/code-adventures/a940ee20862d) and so should you. We only add/differ the following:

* Commits should try to be as simple (atomic) as possible, but not simpler. Meaning you should always be able to revert specific `fix`es, `edit`s, `update`s, `add`s, and `remove`s with `git revert`

#### HTML/Jade

* Two spaces for indentation, never tabs.
* Double quotes only, never single quotes.
* Avoid trailing whitespace. Blank lines should not have any space.
* Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via file://.
* Only use third-party JS when there is no [component](https://github.com/component/component/wiki/Components) available for it.

#### CSS

* For component/module specific styles, comply with `#unique-template-top-node-selector .my-generic-css-update { ... }`
* Multiple-line approach (one pair `property: value;` per line)
* Always a space after a property's colon (e.g., `display: block;` and not `display:block;`)
* End all property lines with a semi-colon
* Avoid trailing whitespace. Blank lines should not have any space.
* For multiple, comma-separated selectors, place each selector on its own line
* Attribute selectors, like `input[type="text"]` should always wrap the attribute's value in double quotes, for consistency and safety (see this [blog post on unquoted attribute values](http://mathiasbynens.be/notes/unquoted-attribute-values) that can lead to XSS attacks).

#### Javascript

* Two spaces for indentation, never tabs.
* `var` everything, never comma first.
* Single quotes only, never double quotes (opposite to HTML/Jade).
* Avoid trailing whitespace. Blank lines should not have any space.
* Inline documentation for new methods, class members, etc.
* One space between conditionals/functions, and their parenthesis and curly braces
  * `if (..) {`
  * `for (..) {`
  * `while (..) {`
  * `function (err) {`
* Always `'string' === type(el)` instead of `type(el) === 'string'`
