import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";

function UpdatePlaylistDialog(prop) {
  let schema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required("Name is a required field"),
    coverImg: yup.mixed(),

    description: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const [playlistDialogIsOpen, setPlaylistDialogIsOpen] = useState(false);
  const [coverImagePath, setCoverImagePath] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const editPlaylistData = prop.rowData;

  useEffect(() => {
    reset();
    if (editPlaylistData.status == "public") {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  }, [editPlaylistData]);

  const handlePlaylistDialogClose = () => {
    setPlaylistDialogIsOpen(false);
    setCoverImagePath("");
    prop.closePlaylist();
    setIsPublic(false);
    reset();
  };

  const formSubmit = (data, e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    var form_data = new FormData();

    form_data.append("id", data.id);
    form_data.append("name", data.name);
    form_data.append("coverImg", data.coverImg[0] ? data.coverImg[0] : "");
    form_data.append("description", data.description);
    form_data.append("status", isPublic ? "public" : "private");

    console.log("formdata : ----------------");

    axios({
      url: `${process.env.REACT_APP_API}admin/playlists/updatePlaylist`,
      method: "post",
      data: form_data,
      // onUploadProgress: uploadProgress,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setIsFormDisabled(false);
        prop.getPlaylistData();
        toast.success("Playlist Updated Successfully...", {
          toastId: "update",
        });
        handlePlaylistDialogClose();
      })
      .catch((err) => {
        setIsFormDisabled(false);
        console.log(err);
      });
  };

  const playlistImgChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePath(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } //
    else {
      setCoverImagePath("");
    }
  };

  useEffect(() => {
    setPlaylistDialogIsOpen(prop.isClicked);
  }, [prop.isClicked]);

  return (
    <div>
      <Dialog
        open={playlistDialogIsOpen}
        onClose={handlePlaylistDialogClose}
        className="dialog-container"
      >
        <DialogTitle className="dialog-title">
          New Playlist
          <IconButton
            className="close-btn"
            onClick={handlePlaylistDialogClose}
            aria-label="close"
          >
            <MdClose size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form method="post" id="form" onSubmit={handleSubmit(formSubmit)}>
            <div className="add-playlist-container">
              <div className="left-side-box">
                <div className="img-box">
                  {coverImagePath != "" ? (
                    <img src={coverImagePath} />
                  ) : (
                    <img
                      src={
                        editPlaylistData.coverImg
                          ? `${process.env.REACT_APP_API}getImg/${editPlaylistData.coverImg}`
                          : require("../../assets/album.jpg")
                      }
                    />
                  )}
                </div>

                <Button
                  className="upload-track-btn"
                  variant="contained"
                  component="label"
                  disabled={isFormDisabled}
                >
                  Upload image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChangeCapture={(e) => {
                      playlistImgChange(e);
                    }}
                    {...register("coverImg")}
                    disabled={isFormDisabled}
                    name="coverImg"
                  />
                </Button>
              </div>
              <div className="right-side-box">
                <input
                  type="text"
                  hidden
                  {...register("id")}
                  name="id"
                  defaultValue={editPlaylistData._id}
                />
                <div className="input-filed">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <TextField
                    className="input"
                    variant="outlined"
                    name="name"
                    id="name"
                    defaultValue={editPlaylistData.name}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ""}
                    disabled={isFormDisabled}
                    {...register("name")}
                  />
                </div>

                <div className="input-filed">
                  <label className="label" htmlFor="">
                    Description
                  </label>
                  <TextField
                    className="input"
                    multiline
                    rows={3}
                    defaultValue={editPlaylistData.description}
                    error={errors.description ? true : false}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                    variant="outlined"
                    disabled={isFormDisabled}
                    {...register("description")}
                    name="description"
                  />
                </div>

                <div className="input-filed">
                  <FormControlLabel
                    style={{ marginBottom: "20px", color: "white" }}
                    control={
                      <Switch
                        checked={isPublic}
                        onChange={() => {
                          setIsPublic(!isPublic);
                        }}
                        name="status"
                      />
                    }
                    label="Public"
                  />
                  <p>Everyone can see public playlists.</p>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>

        <DialogActions className="action-btn">
          <Button
            style={{ color: "white" }}
            onClick={handlePlaylistDialogClose}
          >
            Close
          </Button>
          <Button form="form" variant="contained" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdatePlaylistDialog;
