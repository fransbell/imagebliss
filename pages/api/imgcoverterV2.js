import formidable from "formidable"
import sharp from "sharp"

// disable nextjs bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
}

const imageConverter = async (req, res) => {
  const convert = async (file, format, resize = false) => {
    const data = await sharp(file)[format]().toBuffer()
    const raw = await data.toString("base64")
    return raw
  }
  //POST request only
  if (req.method === "POST") {
    //initialize formidable
    const form = formidable()
    //wait for process to complete
    await new Promise((resolve, reject) => {
      // parse formdata
      form.parse(req, async (err, fields, files) => {
        const path = files.file.filepath
        const data = await convert(path, "png")
        resolve(data)
      })
    }).then((any) => {
      res.json({
        message: "completed",
        data: any,
      })
      res.status(200)
    })
  } else {
    res.status(400)
    res.json({
      message: "an error has occur",
    })
    console.log("an error has occur")
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default imageConverter
