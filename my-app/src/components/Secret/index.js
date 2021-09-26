import React, { useState } from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import UploadButton from "../UploadButton/index";
import { read, utils } from "xlsx";
import {
  cleanAvailabilityString,
  cleanIncompatibilityString,
  buildFinalUnits,
} from "../util";
import api from "../api";
import axios from "axios";
import Stack from "@material-ui/core/Stack";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/core/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect, withRouter } from "react-router-dom";
import Passport from "../AdminLogin/Passport";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class Secret extends React.Component {
  state = { ...this.props.full, alertOpen: false, DialogOpen: false };

  handleFileUpload = (e) => {
    const {
      history: { push },
    } = this.props;
    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = async function (e) {
      var data = new Uint8Array(e.target.result);
      // var workbook = XLSX.read(data, { type: "array" });
      var workbook = read(data, { type: "array" });
      const workSheet = workbook.Sheets["Unit list"];
      const units = utils.sheet_to_json(workSheet, { header: 1 });
      const pureUnits = units.slice(3);
      const cleanUnits = pureUnits.map((unit) => {
        const cleanAvailability = cleanAvailabilityString(unit[3]);
        unit[3] = cleanAvailability;
        const cleanIncompatibility = cleanIncompatibilityString(unit[8]);
        unit[8] = cleanIncompatibility;
        return unit;
      });
      const finalUnits = buildFinalUnits(cleanUnits);
      console.log(
        "🚀 ~ file: index.js ~ line 38 ~ Secret ~ finalUnits",
        finalUnits
      );

      try {
        const res = await axios({
          method: "post",
          url: "https://academic-program.herokuapp.com/api/v1/units",
          data: finalUnits,
        });
        console.log("🚀 ~ file: index.js ~ line 47 ~ Secret ~ res", res);

        push("/");
      } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 52 ~ Secret ~ error", error);
      }
    };
    reader.readAsArrayBuffer(f);
  };

  handleFileDelete = (e) => {
    this.setState({ DialogOpen: true });
  };

  handleDialogClose = async (e) => {
    try {
      const res = await axios({
        method: "delete",
        url: "https://academic-program.herokuapp.com/api/v1/units",
      });
      console.log("🚀 ~ file: index.js ~ line 47 ~ Secret ~ res", res);
      this.setState({ alertOpen: true, DialogOpen: false });
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 52 ~ Secret ~ error", error);
    }
  };

  render() {
    const p=new Passport();
    if (!p.storageLogin(localStorage.getItem("username"), localStorage.getItem("password"))){
        console.log(p.storageLogin(localStorage.getItem("username"), localStorage.getItem("password")))
        return <Redirect to="/login" />
    }else{
    return (
      <>
        <Collapse in={this.state.alertOpen}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  this.setState({ alertOpen: false });
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Operation Successful!
          </Alert>
        </Collapse>

        <Stack spacing={2} direction='row'>
        
          <UploadButton handleFileUpload={this.handleFileUpload} />
          <Button
            variant='contained'
            color='error'
            onClick={this.handleFileDelete}
          >
            Delete All Units
          </Button>
          <stack spacing={8} direction="row" ></stack>
          <Button 
          variant='contained'
          color='error'
          spacing={2}
          onClick={()=>{
            localStorage.clear();
            this.props.history.push('/login');
            
          }}
          >Logout</Button>
        </Stack>

        <Dialog
          open={this.state.DialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{"Warning!!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              All Units information will be deleted!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ DialogOpen: false });
              }}
            >
              No!
            </Button>
            <Button onClick={this.handleDialogClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
}

const mapStateToProps = (state) => ({
  full: state.full,
});

export default connect(mapStateToProps, {})(withRouter(Secret));
