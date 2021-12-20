module.exports = {
  "**/*.ts?(x)": "prettier --write --ignore-unknown",
  "**/*.js?(x)": (filenames) => {
    console.log("FIRED")
    return `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(" --file ")}`
  },
}