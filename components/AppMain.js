import { Chips, Chip, Group, LoadingOverlay, Modal } from "@mantine/core"
import { Text, Button, Collapse, NumberInput } from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { createStyles, Global } from "@mantine/styles"
import { ImageIcon } from "@modulz/radix-icons"
import React, { useState, useRef } from "react"

const useStyles = createStyles((theme) => ({
  mainApp: {
    width: "100%",
    height: "auto",
    marginTop: "12px",
    marginBottom: "12px",
    padding: "12px 0",
    background: theme.colors.gray[2],
    borderRadius: "48px 0",
  },
  target: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: 100,
  },
  dropzone: {
    height: "240px",
    width: "800px",
  },
  imageIcon: {
    width: "80px",
    height: "80px",
    color: "#333",
  },
  fileList: {
    display: "inline-block",
    alignItems: "center",
    border: "1px solid #333",
    borderRadius: "32px",
    fontSize: "14px",
    fontWeight: "100",
    padding: "0 20px",
  },
  listContainer: {
    display: "flex",
    flexWrap: "auto",
    width: "800px",
    color: "#000",
  },
  modal: {
    width: "100vw",
    height: "100vh",
  },
}))

const AppMain = ({ setmodal, newFile }) => {
  const { classes } = useStyles()
  const [Target, setTarget] = useState("")
  const [Option, setOption] = useState(false)
  const [fileSelected, setfileSelected] = useState([])

  const selectFile = (files) => {
    setfileSelected(files)
  }

  const res = fileSelected.map((file) => {
    const value = file.name.split(".")[0]
    return (
      <label key={value} className={classes.fileList}>
        {file.name}
      </label>
    )
  })

  const DropzoneRef = useRef(null)

  const convertHandler = () => {
    // --> img is not selected
    if (!fileSelected.length) {
      return console.log("there is no file selected")
    }
    // initialize formdata
    setmodal()
    const files = document.getElementById("upload").firstChild.files
    files = Array.from(files)

    const populateFormdata = () => {
      const form = new FormData()
      form.append("message", "send")
      form.append("format", Target)
      form.append("resize", false)
      form.append("file", files[0])
      return form
    }
    const uploading = () => {
      if (files.length) {
        fetch("/api/imgcoverterV2", {
          method: "POST",
          body: populateFormdata(),
        }).then((res) => {
          res.json().then((data) => {
            newFile(data, fileSelected, Target)
          })
          files.shift()
          if (files.length) {
            uploading()
          } else {
            return
          }
        })
      }
    }
    console.log(`selected file:${files.length}`)
    uploading()
  }

  return (
    <Group position="center" direction="column" className={classes.mainApp}>
      <div className={classes.target}>
        <div>
          <Text component="p" styles={{ padding: "4px 0" }}>
            Convert image to ....
          </Text>
          <Chips value={Target} onChange={(ev) => setTarget(ev)}>
            <Chip value="jpeg">JPEG</Chip>
            <Chip value="png">PNG</Chip>
            <Chip value="webp">WEBP</Chip>
            <Chip value="avif">AVIF</Chip>
          </Chips>
        </div>

        <Button
          color="dark"
          style={{ margin: "12px 0" }}
          onClick={() => {
            setOption(!Option)
          }}>
          Option
        </Button>
        <Collapse in={Option}>
          Width : <NumberInput />
          Height :<NumberInput />
        </Collapse>
      </div>
      <Dropzone
        ref={DropzoneRef}
        id="upload"
        size="100%"
        onDrop={(files) => {
          selectFile(files)
        }}
        accept={IMAGE_MIME_TYPE}
        my="24px">
        {(status) => (
          <Group className={classes.dropzone} position="center">
            <ImageIcon className={classes.imageIcon} />
            <div>
              <Text>
                Drag and Drop or Click to select file you want to upload.
              </Text>
              <Text color="gray">
                Select many files you would like to upload and convert
              </Text>
              <Text color="gray">Click Convert to continue</Text>
            </div>
          </Group>
        )}
      </Dropzone>
      <Group position="center" className={classes.listContainer}>
        {res}
      </Group>
      <Button onClick={convertHandler}>Convert</Button>
    </Group>
  )
}

export default AppMain
