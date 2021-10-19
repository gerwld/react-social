import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
  textarea,
  input {
    background-color: ${({ theme }) => theme.field_body};
    border-color: ${({ theme }) => theme.main_borders_color};
    color: ${({ theme }) => theme.nav_color}; 
  }
  :root {
    --page-block-shadow: ${({ theme }) => theme.page_block_shadow};
    --page-block-shadow-less: ${({ theme }) => theme.page_block_shadow_less};
    --black-important: ${({ theme }) => theme.black_important};
    --page-border: 1px solid ${({ theme }) => theme.main_borders_color};
    --page-border-color: ${({ theme }) => theme.main_borders_color};
    --tab-secondary: ${({ theme }) => theme.tab_secondary};
    --tab-hover: ${({ theme }) => theme.tab_hover};
    --preloader-bg: ${({ theme }) => theme.preloader_bg};
    --subtext-graydark: ${({ theme }) => theme.subtext_graydark};
    --gray-to-light: ${({ theme }) => theme.gray_to_light};
    --body-color: ${({ theme }) => theme.body};
    --subblock-whiteblue: ${({ theme }) => theme.subblock_whiteblue};


    --main-text-color: ${({ theme }) => theme.main_text_color};
    --main-nav-blue-to-white: ${({ theme }) => theme.main_nav_blue_to_white};
    --main-darkbl-to-white: ${({ theme }) => theme.user_name};
    --progress-buffer-color: ${({ theme }) => theme.progress_buffer_color};

    --main-block-color: ${({ theme }) => theme.main_content_block_color};
    --main-blue-color: #4c6dc1;
    --main-blue-color-text: ${({ theme }) => theme.bluetextmaincolor};
    --main-blue-color-link: ${({ theme }) => theme.bluelinkmaincolor};
    --subhead-text: ${({ theme }) => theme.subhead_text};
    --ava-buttons: ${({ theme }) => theme.ava_buttons};
    --hide-block-bg-color: ${({ theme }) => theme.hide_block};
    --dark-gr-to-li-gray: ${({ theme }) => theme.about_text_color};
    --music-hover: ${({ theme }) => theme.music_hover};
    --music-shadow: ${({ theme }) => theme.music_shadow};

    --users-links-color: ${({ theme }) => theme.users_links};

    --light-to-dark: ${({ theme }) => theme.light_hover_to_dark};
    --lazy-color-sheme: ${({ theme }) => theme.lazy_color_sheme};

    --main-blue-hover: #3f5ba0;
    --icons-propr-color: #aeb7c2;
    --lazy-opacity: ${({ theme }) => theme.lazy_opacity};
   
    
    --main-button-color: #6783c9;
  }
//   Navbar start
  .navbar-dark__main li a {
    color: ${({ theme }) => theme.nav_color}; 
  }
  .news_popup__dark{ 
    color: ${({ theme }) => theme.news_popup__dark};
  }
  .navbar-dark__sub,
  .navbar-dark__sub > a {
      border-color: ${({ theme }) => theme.main_borders_color}; 
      color: ${({ theme }) => theme.nav_color}; 
  }
  .navbar-dark__main li a:hover {
    color: ${({ theme }) => theme.nav_color_hover}; 
  }
//Main start
  .main-content-block {
    background-color: var(--main-block-color);
    border-box: ${({ theme }) => theme.page_block_shadow};
  }

  a.full-name,
  .user_name,
  .subblock_2_title {
    color: ${({ theme }) => theme.subblock_2_title};
  }
  .about_block .about_content {
      color: ${({ theme }) => theme.about_text_color};
  }
  .show-more_btn {
      background-color: ${({ theme }) => theme.showMoreBtn};
      color: ${({ theme }) => theme.text};
      border-color: ${({ theme }) => theme.main_borders_color}; 
  }
  .user_name {
    color: ${({ theme }) => theme.user_name};
  }

  .news_author_name__dark {
    color: ${({ theme }) => theme.bluetowhite};
  }
  .status_editable:hover {
    color: ${({ theme }) => theme.black_important};
  }
//Preloader 
  .preloader__dark {
      filter: ${({ theme }) => theme.preloader__dark};
      -webkit-filter: ${({ theme }) => theme.preloader__dark};
  }
//Emojies 
  .emoji-mart,
  .emoji-mart-category-label > span {
    background-color: var(--main-block-color)!important;
    color: ${({ theme }) => theme.main_text_color};
    border-color: var(--page-border-color)!important;
  }
  .emoji-mart-emoji:hover:before {
    background-color: var(--page-border-color)!important;
  }
  button.emoji-mart-search-icon {
    filter: brightness(100) drop-shadow(1px -1px 0px #fff);
  }
`;