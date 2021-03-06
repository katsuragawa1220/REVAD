# Create environment

* Prepare node and npm Windows:<https://nodejs.org/ja/>  Mac：<http://umekov.hatenablog.com/entry/2016/12/03/000001>

```sh
node -v
npm -v
```

If node > 7.7.0，npm > 4.0.0 is success

* Clone repository

If you don't have git, please install it(<https://git-scm.com/>)

```sh
git clone https://github.com/REVAD-Bot/REVAD.git
```

## Prepare rule

REVAD needs to `rules.csv` on the root

`rules.csv` can be generated by [rulegen-if](https://github.com/REVAD-Bot/rulegen-if)

## Configure a GitHub App

<https://probot.github.io/docs/development/#configure-a-github-app>

## Run

```sh
npm install
npm start
```

## Probot Document

<https://github.com/probot/probot>

## Submit changes

* Clone if yet `git clone https://github.com/REVAD-Bot/REVAD.git`
* Fork it(via GitHub) in your account
* Add your project url `git remote add mine https://github.com/`yourname`/REVAD.git`
* Create your feature branch `git checkout -b my-new-feature`
* Commit your changes `git commit -am 'Add some feature'`
* Push to the branch `git push mine my-new-feature`
* Create new Pull Request(via GitHub)
