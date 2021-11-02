import React from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import {
  Box, Typography,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink } from 'react-router-dom';

const HomePage = () => {

  return (
    <div>
      <NavigationBar
        nav={[
          ['Home']
        ]}
      />
      <Body>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ mt: 2 }}
        >
          <Box mr={3}>
            <Typography
              variant="h4"
            >
              Let's Start Learning
            </Typography>
            <Typography
              component={Box}
              fontSize="h6.fontSize"
              sx={{
                width: '40rem',
              }}
            >
              You can find various course, talent tutor help do do well in school. If you have any trouble, you can post it in forum.
            </Typography>
          </Box>
          <Box>
            <img
              src="image/home-thumbnail.png"
              alt="learning-brain"
              style={{
                height: "20rem"
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ mt: 3, pb: 6 }}
        >
          {
            [{
              color: 'primary.main',
              textColor: '#fff',
              text: 'Finding a course',
              href: '/courses',
              icon: <MenuBookIcon sx={{ fontSize: "7rem" }} />,
            }, {
              color: 'secondary.main',
              textColor: '#fff',
              text: 'Connect a Tutor',
              href: '/tutors',
              icon: <PersonSearchIcon sx={{ fontSize: "7rem" }} />,
            }, {
              color: 'warning.main',
              textColor: '#fff',
              text: 'Ask for a help',
              icon: <ForumIcon sx={{ fontSize: "7rem" }} />,
              href: '/forum',
            }].map((item) => (
              <NavLink
                to={item.href}
                key={item.href}
              >
                <Box
                  sx={{
                    bgcolor: item.color,
                    borderRadius: 3,
                    color: item.textColor,
                    p: 2,
                    mx: 2,
                  }}
                  display="flex"
                  flexDirection="column"
                  textAlign="center"
                  alignItems="center"
                >
                  <Typography
                    component={Box}
                    fontSize="h6.fontSize"
                    fontWeight="bold"
                    sx={{
                      width: '10rem',
                    }}
                  >
                    {item.text}
                  </Typography>
                  {item.icon}
                </Box>
              </NavLink>
            ))
          }
        </Box>
      </Body>
    </div>
  );
}

export default HomePage;
