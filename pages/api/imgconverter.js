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
    const form = formidable({ uploadDir: "./.tmp" })
    //wait for process to complete
    await new Promise((resolve, reject) => {
      // parse formdata
      form.parse(req, async (err, fields, files) => {
        // reconstruct from multikey object to array
        const uploaded = Object.entries(files)
        const images = async () => {
          const rawArray = uploaded.map((file, index) => {
            return convert(file[1].filepath, "png")
          })
          return Promise.all(rawArray)
        }
        const resolution = await images()
        resolve(resolution)
      })
    }).then((any) => {
      res.setHeader("content-type", "html/txt")
      any.map((i) => {
        res.write(`${i}\n`)
      })
      res.end()
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

export default imageConverter
