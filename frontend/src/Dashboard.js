import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Select from "@material-ui/core/Select";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "75px",
    paddingTop: "0px",
  },
  form: {
    width: "135%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    background: "#e8e8e8",
  },
  menu: {
    background: "pink",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
function Card({ name, keyid, lang }) {
  return (
    <Link to={`/${lang}/${keyid}`}>
      <div
        classname="card"
        style={{
          border: "3px solid #617bbc",

          width: "11rem",
          height: "10rem",
          marginRight: "4rem",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {" "}
        <span
          style={{
            border: "3px solid #617bbc",
            width: "100%",
            textAlign: "center",
            height: "48px",
            borderLeft: "none",
            borderRight: "none",
            borderTop: "none",
          }}
        >
          {name}.{lang}
        </span>
      </div>
    </Link>
  );
}

function ModalBox({ openSignIn, setopenSignIn, classCodes, setClassCodes }) {
  const history = useHistory();
  const classes = useStyles();
  const [lang, setlang] = React.useState("C++");
  const [classdata, setclassdata] = useState({
    projectName: "",
    language: "",
    code: "",
  });

  const handleClose = (e) => {
    setopenSignIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(classdata),
    };
    fetch("http://localhost:8000/postsnippet", requestOptions)
      .then((response) => response.json())
      .then((resdata) => {
        setClassCodes([
          ...classCodes,
          {
            projectName: resdata.message.projectName,
            _id: resdata.message._id,
            language: resdata.message.language,
          },
        ]);
        history.push(
          "/" + resdata.message.language + "/" + resdata.message._id
        );
      });
    setopenSignIn(false);
  };
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setlang(name == "language" ? value : null);
    setclassdata({ ...classdata, [name]: value });
  };

  return (
    <div>
      <Dialog
        open={openSignIn}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Snippet
          </Typography>
          <form className={classes.form}>
            <TextField
              id="filled-secondary"
              label="Project Name"
              variant="filled"
              color="secondary"
              onChange={handleChange}
              name="snippet_name"
            />

            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={lang}
              onChange={handleChange}
              name="language"
              className={classes.select}
            >
              <MenuItem value={"cpp"} className={classes.menu}>
                C++
              </MenuItem>
              <MenuItem value={"c"}>C</MenuItem>
              <MenuItem value={"java"}>Java</MenuItem>
              <MenuItem value={"py"}>Python</MenuItem>
            </Select>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Create new Code
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClose}
            >
              cancel
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
//
function Content({ setopenSignIn }) {
  const handleSnippet = () => {
    setopenSignIn(true);
  };
  // let arr = [];
  let cardArray = localStorage.getItem("mohsin");
  let parsedCardArray = JSON.parse(cardArray);
  return (
    <div
      className="content"
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        border: "2px solid red",
        flexDirection: "column",
      }}
    >
      <div
        className="select-section"
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div
          className="select-project"
          style={{
            border: "1px solid black",
            marginTop: "9px",
            width: "9em",
            height: "2.4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleSnippet}
        >
          <p>New Project</p>
        </div>
      </div>
      <div
        className="class-card-section"
        style={{ display: "flex", marginLeft: "4rem", marginTop: "5rem" }}
      >
        {parsedCardArray == null ? (
          <h2>No Project Yet create New.............</h2>
        ) : (
          parsedCardArray.map((data) => (
            <Card
              name={data.projectName}
              keyid={data._id}
              lang={data.language}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function Dashboard({
  openSignIn,
  setopenSignIn,
  setClassCodes,
  classCodes,
}) {
  return (
    <div style={{ height: "100vh" }}>
      <Content setopenSignIn={setopenSignIn} />
      <ModalBox
        openSignIn={openSignIn}
        setopenSignIn={setopenSignIn}
        setClassCodes={setClassCodes}
        classCodes={classCodes}
      />
    </div>
  );
}
