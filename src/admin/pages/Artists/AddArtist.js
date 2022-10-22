import {
  Button,
  TextField,
  Chip,
  LinearProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

function AddArtist() {
  let schema = yup.object().shape({
    name: yup.string().required("Title is a required field"),
    coverImg: yup
      .mixed()
      .test("required", "Please select song cover img", (value) => {
        return value && value.length;
      }),
    description: yup.string(),
    tags: yup.array().min(1, "Tags is a requird field"),
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

  const [selectedTags, setSelectedTags] = useState([]);
  const [inputTag, setInputTag] = useState();
  const [progressValue, setProgressValue] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [coverImagePath, setCoverImagePath] = useState("");
  const [artistActive, setArtistActive] = useState(true);
  const [artistIsVerified, setArtistIsVerified] = useState(false);

  useEffect(() => {
    setValue("tags", selectedTags);
  }, [selectedTags]);

  const tagsChipHandleDelete = (e, value) => {
    setSelectedTags((tags) => {
      return tags.filter((e) => e !== value);
    });
  };

  const handleTagsKeyDown = (e) => {
    if (e.key === "Enter" && inputTag != "") {
      if (selectedTags.indexOf(inputTag) === -1) {
        setSelectedTags([...selectedTags, inputTag]);

        setInputTag("");
      } else {
        setInputTag("");
      }
    }
  };

  const songImgChange = (e) => {
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

  const formSubmit = async (data, e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    var form_data = new FormData();

    form_data.append("name", data.name);
    form_data.append("coverImg", data.coverImg[0]);
    form_data.append("tags", data.tags);
    form_data.append("description", data.description);
    form_data.append("verified", artistIsVerified);
    form_data.append("status", artistActive);

    const uploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgressValue(percent);
    };

    axios({
      url: `${process.env.REACT_APP_API}admin/artists/addArtist`,
      method: "post",
      data: form_data,
      onUploadProgress: uploadProgress,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setIsFormDisabled(false);
        if (res.data === 1) {
          console.log(res);
          alert("submitted");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        setIsFormDisabled(false);
        console.log(err);
      });
  };

  console.log(errors);

  return (
    <div className="add-track-container">
      <Box
        sx={{ width: "100%", marginBottom: "30px" }}
        display={isFormDisabled ? "block" : "none"}
      >
        <h5 className="song-label">Uploading...</h5>
        <LinearProgress variant="determinate" value={progressValue} />
      </Box>
      <form method="post" id="form" onSubmit={handleSubmit(formSubmit)}>
        <div className="left-side-box">
          <div className="img-box">
            {coverImagePath != "" ? (
              <img src={coverImagePath} />
            ) : (
              <img src={require("../../assets/album.jpg")} />
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
                songImgChange(e);
              }}
              disabled={isFormDisabled}
              {...register("coverImg")}
              name="coverImg"
            />
          </Button>

          {errors.coverImg ? (
            <ul className="error">
              {errors.coverImg ? <li>{errors.coverImg.message}</li> : ""}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="right-side-box">
          <TextField
            className="input"
            label="Name"
            variant="outlined"
            {...register("name")}
            name="name"
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ""}
            disabled={isFormDisabled}
          />

          <TextField
            onKeyDown={handleTagsKeyDown}
            onChange={(e) => {
              setInputTag(e.target.value);
            }}
            className="input"
            label="Tags"
            placeholder="+ Add Tags"
            value={inputTag}
            name="tags"
            disabled={isFormDisabled}
            error={errors.tags ? true : false}
            helperText={errors.tags ? errors.tags.message : ""}
            InputProps={
              selectedTags != ""
                ? {
                    startAdornment: selectedTags.map((value) => (
                      <Chip
                        label={value}
                        className="tagChip"
                        onDelete={(e) => tagsChipHandleDelete(e, value)}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    )),
                  }
                : null
            }
          />

          <TextField
            className="input"
            multiline
            rows={3}
            label="description"
            error={errors.description ? true : false}
            helperText={errors.description ? errors.description.message : ""}
            variant="outlined"
            disabled={isFormDisabled}
            {...register("description")}
            name="description"
          />

          <FormControlLabel
            style={{ marginBottom: "20px", color: "white" }}
            control={
              <Switch
                checked={artistActive}
                onChange={() => {
                  setArtistActive(!artistActive);
                }}
                name="status"
              />
            }
            label="Active"
          />

          <FormControlLabel
            style={{ marginBottom: "20px", marginLeft: "20px", color: "white" }}
            control={
              <Switch
                checked={artistIsVerified}
                onChange={() => {
                  setArtistIsVerified(!artistIsVerified);
                }}
                name="status"
              />
            }
            label="Verified"
          />

          <div className="button-group">
            <Button variant="contained" type="submit" disabled={isFormDisabled}>
              Save
            </Button>
            <Button
              className="reset-btn"
              type="reset"
              disabled={isFormDisabled}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddArtist;
