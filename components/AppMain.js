import { Chips, Chip, Group, Notification } from "@mantine/core"
import { Text, Button, Collapse, NumberInput } from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { createStyles } from "@mantine/styles"
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
      setnotify(true)
      return
    }
    if (!Target) {
      setnotify(true)
      return
    }
    // initialize formdata
    setmodal()
    const files = document.getElementById("upload").firstChild.files
    const maxLength = files.length
    files = Array.from(files)

    const populateFormdata = (order) => {
      const form = new FormData()
      form.append("message", "send")
      form.append("format", Target)
      form.append("resize", false)
      form.append("file", files[0])
      form.append("order", maxLength - order)
      return form
    }
    const uploading = () => {
      if (files.length) {
        fetch("https://imagebliss.deta.dev/api/v1/imageconverter", {
          method: "POST",
          body: populateFormdata(files.length),
        })
          .then((res) => {
            res.json().then((data) => {
              newFile(data, data.idx, fileSelected, Target)
            })
            files.shift()
            if (files.length) {
              uploading()
            } else {
              return
            }
          })
          .catch((err) => {
            alert(
              `Server timeout limit process { 10s }\n your file larger than server can handle`
            )
          })
      }
    }
    uploading()
  }

  const [notify, setnotify] = useState(false)

  return (
    <Group
      size="xl"
      position="center"
      direction="column"
      className={classes.mainApp}
    >
      {notify ? (
        <Notification
          style={{
            width: "420px",
            position: "fixed",
            bottom: "0",
            zIndex: "10",
          }}
          onClose={() => {
            setnotify(false)
          }}
        >
          There is no file or target format selected
        </Notification>
      ) : null}
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
      </div>
      <Dropzone
        ref={DropzoneRef}
        id="upload"
        size="xl"
        maxSize={1 * 1024 * 1024}
        onDrop={(files) => {
          selectFile(files)
        }}
        accept={IMAGE_MIME_TYPE}
        my="24px"
      >
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
