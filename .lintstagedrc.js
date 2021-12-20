module.exports = {
  "**/*.ts?(x)": (filenames) => {
    console.log(filenames)
    const filenamesString = filenames
      .map((file) => file.split(process.cwd())[1])
      .join(" --file ")
    return [
      `next lint --fix --file ${filenamesString}`,
      `prettier --write --ignore-unknown .${filenamesString}`,
    ]
  },
}
