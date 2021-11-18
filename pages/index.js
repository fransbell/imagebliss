import {
  Text,
  createStyles,
  Container,
  Paper,
  Title,
  Modal,
  Button,
  Table,
  Loader,
  Center,
} from "@mantine/core"
import AppMain from "../components/AppMain"
import { useState } from "react"

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

  const [modalContent, setmodalContent] = useState(null)

  const modalHander = () => {
    setModalVal(!ModalVal)
  }

  const addList = (raw, files, target) => {
    console.log(files)
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
            <Loader component="a" size="xs" mx="0" display="block" />
          </td>
          <td textAlign="center">
            <Loader size="xs" />
          </td>
        </tr>
      )
    })
    setmodalContent(modal)
    console.log(raw)
    function toSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024))
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      )
    }
  }

  return (
    <main className={classes.main}>
      <Container className={classes.heading}>
        <Title className={classes.heading}>Image Converter</Title>
      </Container>

      <Container size="100%" className={classes.contents}>
        <Modal size="xl" opened={ModalVal} onClose={() => setModalVal(false)}>
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
            <tbody>{modalContent}</tbody>
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
