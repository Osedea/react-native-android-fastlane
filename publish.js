#! /usr/local/bin/node

const execSync = require("child_process").execSync;

function publishDocker() {
  const now = new Date()
  const repo = `adrienthiery/react-native-android-fastlane`
  const finaltag = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
  const cmd =`
docker build -t ${repo}:${finaltag} .
docker tag ${repo}:${finaltag} ${repo}
docker push ${repo}:${finaltag}
docker push ${repo}
  `
  cmd.trim().split("\n").map(i => {
    const cmd = i.trim();
    if (cmd) {
      if (!cmd.includes('login')) {
        console.log(cmd);
      }
      const output = execSync(cmd)
      console.log(output.toString());
    }
  })
}

publishDocker()
