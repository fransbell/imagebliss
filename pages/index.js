import { Text, createStyles, Container, Paper, Button } from "@mantine/core"
import { Title, Modal, Table, Loader } from "@mantine/core"
import AppMain from "../components/AppMain"
import Head from "next/head"
import { useState, useRef } from "react"

function toSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["Bytes", "kB", "MB", "GB", "TB"][i]
  )
}

const useStyles = createStyles((theme) => ({
  main: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    height: "100%",
    fontFamily: "Poppins, sans-serif",
  },
  heading: {
    maxWidth: "100%",
    background: "#333",
    padding: "16px 48px",
    width: "100%",
    color: "#fff",
    borderRadius: "0 48px",
    [`h1`]: {
      fontSize: "72px",
      fontWeight: 100,
      padding: 0,
      margin: 0,
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        fontSize: "48px",
      },
    },
  },
  contents: {
    height: "100%",
    width: "80%",
  },
  footer: {
    [`p`]: {
      textAlign: "center",
      fontWeight: 700,
    },
  },
}))

const Home = (props) => {
  const [ModalVal, setModalVal] = useState(false)
  const { classes } = useStyles()

  const [modalContent, setmodalContent] = useState([])

  const ref = useRef(null)

  const modalHander = () => {
    setModalVal(!ModalVal)
  }

  const initModal = (raw, order, files, target) => {
    const modal = files.map((dt, index) => {
      const name = dt.name.split(".")
      return (
        <tr key={dt.name}>
          <td>{index + 1}</td>
          <td>{name[0]}</td>
          <td>{name[1]}</td>
          <td>{target}</td>
          <td>{toSize(dt.size)}</td>
          <td>
            <Loader size="xs" style={{ display: "block", margin: "auto" }} />
          </td>
          <td>
            <Loader size="xs" style={{ display: "block", margin: "auto" }} />
          </td>
        </tr>
      )
    })
    setmodalContent(Array.from(modal))
  }

  const addList = async (raw, order, files, target) => {
    const size = atob(raw.data).length
    size = toSize(size)
    await new Promise(async (resolve, reject) => {
      if (order) {
        await initModal(raw, order, files, target)
        resolve()
      }
    }).then((any) => {
      // it is discourage to set innerHTML directly into DOM due to risk of XSS
      ref.current.children[
        order
      ].children[5].innerHTML = `<div style='text-align:center'>${size}</div>`
      ref.current.children[
        order
      ].children[6].innerHTML = `<div style='text-align:center'><a download="${ref.current.children[order].children[1].innerText}.${target}" href='data:image/${target};base64,${raw.data}' style="text-decoration:none;color:blue">Download</a></div>`
    })
  }

  return (
    <main className={classes.main}>
      <Head>
        <title>Image Converter</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Container className={classes.heading}>
        <Title className={classes.heading}>Image Converter</Title>
      </Container>

      <Container size="100%" className={classes.contents}>
        <Modal
          size="xl"
          opened={ModalVal}
          onClose={() => {
            setModalVal(false)
            setmodalContent([])
          }}
        >
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Filename</th>
                <th>Format</th>
                <th>Target</th>
                <th>Upload Size</th>
                <th>
                  <p style={{ textAlign: "center" }}>Covertion</p>
                </th>
                <th>
                  <p style={{ textAlign: "center" }}>Progress</p>
                </th>
              </tr>
            </thead>
            <tbody ref={ref} id="table_root">
              {modalContent.map((obj) => {
                return obj
              })}
            </tbody>
          </Table>
        </Modal>
        <AppMain setmodal={modalHander} newFile={addList} />
      </Container>

      <Paper className={classes.footer}>
        <Text component="p">fransbell@github.io</Text>
      </Paper>
    </main>
  )
}

export default Home
