import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

function LyricsDialogBox(prop) {
  const { isOpen, handleClose, currentTime } = prop;

  const songData = JSON.parse(
    useSelector((state) => state.changeCurrPlayingSong)
  );

  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    if (songData.lyrics) {
      let text = songData.lyrics.trim().split("\n");

      text.forEach((line) => {
        line = line.trim();
        let min = parseInt(line.substr(1, 2));
        let sec = parseInt(line.substr(4, 5));

        if (isNaN(min) || isNaN(sec)) return;

        text = line.substr(line.indexOf("]") + 1, line.length).trim();

        if (sec + min * 60 == Math.floor(currentTime)) {
          if (lyrics != text) {
            console.log(text);
            setLyrics(text);
          }
        }
      });
    }
  }, [currentTime]);

  return (
    <div>
      <Dialog
        className="dialog-container lyrics-dialog"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title" className="dialog-title">
          &nbsp;
          <IconButton
            className="close-btn"
            onClick={handleClose}
            aria-label="close"
          >
            <MdClose size={24} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p className="lyrics-content">{lyrics}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LyricsDialogBox;
