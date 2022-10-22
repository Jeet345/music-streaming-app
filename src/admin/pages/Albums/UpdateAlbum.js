import {
  Button,
  TextField,
  Chip,
  Autocomplete,
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
import { useLocation, useNavigate } from "react-router-dom";

function UpdateAlbum() {
  let schema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required("Title is a required field"),
    coverImg: yup.mixed(),
    description: yup.string(),
    artists: yup.array().min(1, "Artists is a required field"),
    tags: yup.array().min(1, "Tags is a requird field"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state;

  const [selectedTags, setSelectedTags] = useState(rowData.tags);
  const [inputTag, setInputTag] = useState();
  const [progressValue, setProgressValue] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [coverImagePath, setCoverImagePath] = useState("");
  const [albumActive, setAlbumActive] = useState(
    rowData.status == "active" ? true : false
  );
  const [artistList, setArtistList] = useState([]);
  const [selectedArtistList, setSelectedArtistList] = useState([
    ...rowData.artist_names,
  ]);

  useEffect(() => {
    setValue("tags", selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    let arrayOfArtistId = [];

    rowData.artist_names.map((val, ele) => {
      arrayOfArtistId.push(val._id);
    });

    setValue("artists", arrayOfArtistId);
  }, []);

  useEffect(() => {
    // getting artist data from api
    axios({
      url: `${process.env.REACT_APP_API}admin/artists/getAllActiveArtists`,
      method: "get",
    })
      .then((res) => {
        setArtistList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

    console.log(data);

    setIsFormDisabled(true);

    var form_data = new FormData();

    form_data.append("id", data.id);
    form_data.append("name", data.name);
    form_data.append("coverImg", data.coverImg[0] ? data.coverImg[0] : "");
    form_data.append("artists", data.artists);
    form_data.append("tags", data.tags);
    form_data.append("description", data.description);
    form_data.append("status", albumActive);

    console.log("formdata : ----------------");
    console.log(...form_data);

    const uploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgressValue(percent);
    };

    axios({
      url: `${process.env.REACT_APP_API}admin/albums/updateAlbum`,
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
          alert("Updated Successfully...");
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
        <input
          type="hidden"
          value={rowData._id}
          name="id"
          {...register("id")}
        />
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
            defaultValue={rowData.name}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ""}
            disabled={isFormDisabled}
          />

          <Controller
            control={control}
            name="artists"
            render={({ field }) => (
              <Autocomplete
                options={artistList}
                className="input"
                autoHighlight
                // disableCloseOnSelect
                multiple={true}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                value={selectedArtistList}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => {
                  const arrayOfArtist = [];

                  value.map((data) => {
                    arrayOfArtist.push(data._id);
                  });

                  setSelectedArtistList(value);
                  setValue("artists", arrayOfArtist, { shouldValidate: true });
                }}
                name="artists"
                disabled={isFormDisabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Artists"
                    name="artists"
                    error={errors.artists ? true : false}
                    helperText={errors.artists ? errors.artists.message : ""}
                  />
                )}
              />
            )}
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
            defaultValue={rowData.description}
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
                checked={albumActive}
                onChange={() => {
                  setAlbumActive(!albumActive);
                }}
                name="status"
              />
            }
            label="Active"
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

export default UpdateAlbum;
