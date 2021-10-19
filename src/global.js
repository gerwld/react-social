import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
.anim-theme {
    // transition: background 0s ease-in, box-shadow 0s ease-in, border-color 0s ease-in, color 0s ease-in!important;
}
*{
    border-color: ${({ theme }) => theme.borderColor}; 
}
  :root {
    --page-block-shadow: ${({ theme }) => theme.main_content_block};
    --page-block-shadow-less: ${({ theme }) => theme.page_block_shadow_less};
    --black-important: ${({ theme }) => theme.text};
    --subhead-text: ${({ theme }) => theme.subhead_var};
    --main-blue-color: ${({ theme }) => theme.mainBlueColor};
    transition: 0s ease-in;
  }
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0s ease-in, color 0s ease-in!important;
  }
  .main-content-block {
    background-color: ${({ theme }) => theme.main_content_block};
    transition: background 0s ease-in, color 0s ease-in!important;
  }
  .full-name {
    color: ${({ theme }) => theme.text};
  }
  .News_col_title_active__38FRh,
  .News_col_title_active__38FRh {
      background-color: ${({ theme }) => theme.body};
      border-bottom: ${({ theme }) => theme.body};
  }
  .main-info__content {
    border: ${({ theme }) => theme.border_main};
  }
  .about_block:first-child {
      border-top: ${({ theme }) => theme.border_main};
  }
  .News_col_title_active__38FRh {
    border-color: ${({ theme }) => theme.text};
  }
  .about_block .about_subtitle,
  .user_name,
  .MyPosts_user_posts_nav__1qp4D li a,
  .Navbar_app_navbar__1ee0e a,
  .subblock_2_title,
  .main-content-block a,
  .News_navbar__Lmkhx li, .News_col_title__2Vwu1,
  .News_comment_name__2HoQE,
  .WhatsNew_whatsnew_field__qiMwz + .WhatsNew_send__1JJpN,
  .css-ahj2mt-MuiTypography-root,
  .News_block_buttons__38eZg div > span {
    color: ${({ theme }) => theme.text};
  }
  .about_block .about_content {
    color: ${({ theme }) => theme.subtext}; 
  }
  .News_comment_data__156wK {
    color: ${({ theme }) => theme.subhead_var};
  }
  .News_block_buttons__38eZg::before,
  .News_comment_block__3vFck::after,
  .News_comment_block_form__1gYIl::before,
  .News_comments_parent__15X7R::before,
  .News_block_buttons__38eZg::before {
    background-color: ${({ theme }) => theme.borderColor}; 
    transition: 0s ease-in!important;
  }
  .News_comment_field__3BN_q textarea {
      background-color: ${({ theme }) => theme.textarea_background}; 
      transition: 0s ease-in!important;
  }
  .show-more_btn {
    background-color: ${({ theme }) => theme.showMoreBtn};
    color: ${({ theme }) => theme.text};
    transition: 0s ease-in!important;
  }
  .MyPosts_user_posts_nav__1qp4D::after {
      background-color: ${({ theme }) => theme.text};
  }
  .Header_dark_theme__2vF-r:hover {
    background-color: ${({ theme }) => theme.showMoreBtn};
  }
`;