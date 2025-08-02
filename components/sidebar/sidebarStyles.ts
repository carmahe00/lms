// sidebarStyles.js







// sx={{
//   fontWeight: 'bold',
//   color: '#333',
//   fontSize: '2.5rem',
//   letterSpacing: '1px',
//   lineHeight: '1.4',
//   textTransform: 'uppercase',
//   textShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle text shadow for modern feel
//   backgroundImage: 'linear-gradient(45deg, #FF6F61, #FF8C00)', // Gradient effect
//   backgroundClip: 'text', // Make gradient fill text
//   color: 'transparent',
//   display: 'inline-block',
// }}










export const drawerStyles = (isHovered:boolean) => ({
    width: isHovered ? 300 : 100,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: isHovered ? 300 : 100,
      transition: "width 0.3s",
      overflowX: "hidden",
      backgroundColor: "#1a1a1a",
      color: "white",
      paddingTop: "20px",
    },
  });
  
  export const listItemStyles = (isHovered:boolean) => ({
    marginBottom: "10px",
    padding: isHovered ? "10px 20px" : "10px 0",
    cursor: "pointer",
    ":hover": {
      borderLeft: "19px solid blueviolet !important",
    },
    transition: "border-bottom 0.3s ease",
  });
  
  export const listItemIconStyles = (isHovered:boolean) => ({
    color: "white",
    minWidth: isHovered ? "50px" : "40px",
    justifyContent: "center",
    marginLeft: "20px",
  });
  
  export const listItemTextStyles = {
    marginLeft: "10px",
    fontSize: "18px",
  };
  
  export const logoutIconStyles = {
    fontSize: "32px",
    color: "blueviolet",
  };
  
  export const appBarStyles = {
    backgroundColor: "#1a1a1a",
  };
  
  export const drawerMobileStyles = {
    display: "block",
    "& .MuiDrawer-paper": {
      width: 300,
      backgroundColor: "#1a1a1a",
      color: "white",
    },
  };
  
  export const mainContentStyles = {
    flexGrow: 1,
    p: 3,
    marginLeft: { sm: "100px", xs: "0" },
  };