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

function UpdateTrack() {
  let schema = yup.object().shape({
    id: yup.string().required(),
    title: yup.string().required("Title is a required field"),
    songImg: yup.mixed(),
    lyrics: yup.string(),
    artists: yup.array().min(1, "Artists is a required field"),
    album: yup.string(),
    genres: yup.array().min(1, "Genres is a required field"),
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

  console.log("rowData", rowData);

  const [selectedTags, setSelectedTags] = useState(rowData.tags);
  const [inputTag, setInputTag] = useState();
  const [progressValue, setProgressValue] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [songImagePath, setSongImagePath] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [trackActive, setTrackActive] = useState(
    rowData.status == "active" ? true : false
  );

  useEffect(() => {
    setValue("tags", selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    let arrayOfArtistId = [];
    let arrayOfGenresId = [];

    rowData.artist_names.map((val, ele) => {
      arrayOfArtistId.push(val._id);
    });

    rowData.genres.map((val, ele) => {
      arrayOfGenresId.push(val._id);
    });
 
    setValue("artists", arrayOfArtistId);
    if (rowData.album_name.length > 0) {
      setValue("album", rowData.album_name[0]._id);
    }
    setValue("genres", arrayOfGenresId);
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

    // getting album data from api
    axios({
      url: `${process.env.REACT_APP_API}admin/albums/getAllActiveAlbums`,
      method: "get",
    })
      .then((res) => {
        setAlbumList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // getting genres data from api
    axios({
      url: `${process.env.REACT_APP_API}admin/genres/getAllActiveGenres`,
      method: "get",
    })
      .then((res) => {
        setGenresList(res.data);
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

    form_data.append("id", data.id);
    form_data.append("title", data.title);
    form_data.append("songImg", data.songImg[0] ? data.songImg[0] : "");
    form_data.append("album", data.album);
    form_data.append("artists", data.artists);
    form_data.append("genres", data.genres);
    form_data.append("tags", data.tags);
    form_data.append("lyrics", data.lyrics);
    form_data.append("status", trackActive);

    const uploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgressValue(percent);
    };

    axios({
      url: `${process.env.REACT_APP_API}admin/songs/updateTrack`,
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
          console.log(res.data);
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
            {songImagePath != "" ? (
              <img src={songImagePath} />
            ) : (
              <img src={require("../../assets/album.jpg")} />
            )}
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

          {errors.songImg ? (
            <ul className="error">
              {errors.songImg ? <li>{errors.songImg.message}</li> : ""}
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
            defaultValue={rowData.title}
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ""}
            disabled={isFormDisabled}
          />

          <Autocomplete
            options={albumList}
            className="input"
            {...register("album")}
            autoHighlight
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option.name}
            disabled={isFormDisabled}
            name="album"
            defaultValue={rowData.album_name[0]}
            onChange={(e, value) => {
              setValue("album", value._id, { shouldValidate: true });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Album"
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
                options={artistList}
                className="input"
                autoHighlight
                multiple={true}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                defaultValue={rowData.artist_names}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => {
                  const arrayOfArtist = [];

                  value.map((data) => {
                    arrayOfArtist.push(data._id);
                  });

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

          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                className="input"
                autoHighlight
                options={genresList}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                defaultValue={rowData.genres}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                disabled={isFormDisabled}
                onChange={(e, value) => {
                  const arrayOfGenres = [];

                  value.map((data) => {
                    arrayOfGenres.push(data._id);
                  });

                  setValue("genres", arrayOfGenres, { shouldValidate: true });
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
            defaultValue={rowData.lyrics}
            error={errors.lyrics ? true : false}
            helperText={errors.lyrics ? errors.lyrics.message : ""}
            variant="outlined"
            disabled={isFormDisabled}
            {...register("lyrics")}
            name="lyrics"
          />

          <FormControlLabel
            style={{ marginBottom: "20px", color: "white" }}
            control={
              <Switch
                checked={trackActive}
                onChange={() => {
                  setTrackActive(!trackActive);
                }}
                name="status"
              />
            }
            label="Active"
          />

          <div className="button-group">
            <Button variant="contained" type="submit" disabled={isFormDisabled}>
              Update
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

export default UpdateTrack;
