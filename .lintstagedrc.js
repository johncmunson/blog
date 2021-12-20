module.exports = {
  "**/*.ts?(x)": (filenames) => {
    console.log(filenames)
    const files = filenames.map((file) => file.split(process.cwd())[1])
    console.log(files)
    return [
      `next lint --fix --file ${files.join(" --file ")}`,
      `prettier --write --ignore-unknown ${files
        .map((file) => "." + file)
        .join(" ")}`,
    ]
  },
}
