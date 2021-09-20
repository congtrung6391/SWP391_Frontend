import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  Box, Button, Menu, TextField, useTheme, Tooltip,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';

import {
  FacebookShareButton, FacebookIcon,
  LinkedinShareButton, LinkedinIcon,
  TwitterShareButton, TwitterIcon,
  TumblrShareButton, TumblrIcon,
} from 'react-share';

const ButtonShare = (props) => {
  const {
    url, icon, text, component: Component, buttonProps, className,
  } = props;
  const buttonRef = useRef(null);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const theme = useTheme();

  const toggleMenu = () => {
    if (anchorMenu) {
      setAnchorMenu(null);
    } else {
      const ele = buttonRef.current;
      setAnchorMenu(ele);
    }
  };

  const onCopyUrl = () => {
    const textField = document.getElementById('url-textfield');
    textField.select();
    document.execCommand('copy');
    setAnchorMenu(null);
  };

  return (
    [(
      <Component
        className={className}
        ref={buttonRef}
        key="share-button"
        id="share-button"
        onClick={toggleMenu}
        variant="outlined"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...buttonProps}
      >
        {icon}
        &nbsp;
        {text}
      </Component>
    ), (
      <Menu
        key="share-menu"
        id="share-menu"
        anchorEl={anchorMenu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={toggleMenu}
      >
        <Box mt={2} mx={2}>
          <TextField
            fullWidth
            id="url-textfield"
            value={url}
            readOnly
            variant="outlined"
            margin="dense"
            style={{ margin: '0', marginRight: '0.3rem' }}
          />
        </Box>
        <Box display="flex" flexDirection="row" mt={2} mx={2}>
          <Tooltip title="Share on Facebook" arrow>
            <FacebookShareButton className="mr-2" url={url}>
              <FacebookIcon round size={48} />
            </FacebookShareButton>
          </Tooltip>
          <Tooltip title="Share on Twitter" arrow>
            <TwitterShareButton className="mr-2" url={url}>
              <TwitterIcon round size={48} />
            </TwitterShareButton>
          </Tooltip>
          <Tooltip title="Share on LinkedIn" arrow>
            <LinkedinShareButton className="mr-2" url={url}>
              <LinkedinIcon round size={48} />
            </LinkedinShareButton>
          </Tooltip>
          <Tooltip title="Share on Tumblr" arrow>
            <TumblrShareButton className="mr-2" url={url}>
              <TumblrIcon round size={48} />
            </TumblrShareButton>
          </Tooltip>
          {/* <EmailShareButton className="mr-2" url={url}>
              <EmailIcon round size={50} />
            </EmailShareButton> */}
          <Tooltip title="Copy link" arrow>
            <IconButton
              onClick={onCopyUrl}
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
              }}
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Menu>
    )]
  );
};

ButtonShare.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.object,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ButtonShare.defaultProps = {
  url: '',
  text: 'Share',
  icon: <ShareIcon fontSize="small" />,
  component: Button,
};

export default ButtonShare;
