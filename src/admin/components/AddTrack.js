import {
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Chip,
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../pages/Songs/song.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

function AddTrack() {
  const names = [
    "Admin",
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  let schema = yup.object().shape({
    title: yup.string().required("Title is a required field"),
    songImg: yup
      .mixed()
      .test("required", "Please select song cover img", (value) => {
        return value && value.length;
      }),
    song: yup.mixed().test("required", "Please select song track", (value) => {
      return value && value.length;
    }),
    lyrics: yup.string(),
    artists: yup.array().required("Artists is a required field"),
    album: yup.string().required("Album is a required field"),
    duration: yup
      .number()
      .min(10, "Please enter valid duration")
      .typeError("Please enter valid duration")
      .required("Duration field is required"),
    genres: yup.array().required("Genred is a required field"),
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

  const [selectedTags, setSelectedTags] = useState([]);
  const [inputTag, setInputTag] = useState();
  const [progressValue, setProgressValue] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [songImagePath, setSongImagePath] = useState("");

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
        setSongImagePath(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } //
    else {
      setSongImagePath("");
    }
  };

  const formSubmit = async (data, e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    var form_data = new FormData();

    form_data.append("title", data.title);
    form_data.append("songImg", data.songImg[0]);
    form_data.append("album", data.album);
    form_data.append("artists", data.artists);
    form_data.append("duration", data.duration);
    form_data.append("genres", data.genres);
    form_data.append("tags", data.tags);
    form_data.append("lyrics", data.lyrics);
    form_data.append("song", data.song[0]);

    const uploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgressValue(percent);
    };

    axios({
      url: "http://localhost:4000/admin/addtrack",
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
            {songImagePath != "" ? (
              <img src={songImagePath} />
            ) : (
              <img src={require("../assets/album.jpg")} />
            )}

            {/* <img
              src={require(songImagePath != ""
                ? songImagePath
                : "../assets/album.jpg")}
            /> */}
            <Button
              className="upload-btn"
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
                {...register("songImg")}
                name="songImg"
              />
            </Button>
          </div>

          <Button
            className="upload-track-btn"
            variant="contained"
            component="label"
            disabled={isFormDisabled}
          >
            <input
              hidden
              accept=".mp3"
              type="file"
              name="song"
              id="song"
              disabled={isFormDisabled}
              {...register("song")}
            />
            Upload Track
          </Button>

          {errors.song || errors.songImg ? (
            <ul className="error">
              {errors.songImg ? <li>{errors.songImg.message}</li> : ""}
              {errors.song ? <li>{errors.song.message}</li> : ""}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="right-side-box">
          <TextField
            className="input"
            label="Title"
            variant="outlined"
            {...register("title")}
            name="title"
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ""}
            disabled={isFormDisabled}
          />

          <Autocomplete
            options={names}
            className="input"
            {...register("album")}
            autoHighlight
            getOptionLabel={(option) => option}
            disabled={isFormDisabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Album"
                name="album"
                error={errors.album ? true : false}
                helperText={errors.album ? errors.album.message : ""}
              />
            )}
          />

          <Controller
            control={control}
            name="artists"
            render={({ field }) => (
              <Autocomplete
                options={names}
                className="input"
                autoHighlight
                multiple={true}
                getOptionLabel={(option) => option}
                onChange={(e, value) => setValue("artists", value)}
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
            className="input"
            type={"number"}
            label="Duration(ms)"
            variant="outlined"
            disabled={isFormDisabled}
            error={errors.duration ? true : false}
            helperText={errors.duration ? errors.duration.message : ""}
            {...register("duration")}
            name="duration"
          />

          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                className="input"
                autoHighlight
                options={names}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                disabled={isFormDisabled}
                onChange={(e, value) => {
                  setValue("genres", value);
                }}
                name="genres"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Genres"
                    name="genres"
                    placeholder="Genres"
                    error={errors.genres ? true : false}
                    helperText={errors.genres ? errors.genres.message : ""}
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
            label="Lyrics"
            error={errors.lyrics ? true : false}
            helperText={errors.lyrics ? errors.lyrics.message : ""}
            variant="outlined"
            disabled={isFormDisabled}
            {...register("lyrics")}
            name="lyrics"
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

export default AddTrack;
