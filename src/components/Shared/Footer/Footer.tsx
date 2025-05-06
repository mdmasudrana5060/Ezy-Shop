import { Box, Container, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: "#f5f5f5", py: 3 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        px={2}
        spacing={4}
      >
        {/* Support Column */}
        <Stack spacing={1}>
          <Typography variant="h6">Support</Typography>
          <Box>Mobile No: 0177777777777</Box>
          <Box>Store locator</Box>
        </Stack>

        {/* About Us Column */}
        <Stack spacing={1}>
          <Typography variant="h6">ABOUT US</Typography>
          <Box>Affiliate Program</Box>
          <Box>Online Delivery</Box>
          <Box>Refund and Return Policy</Box>
          <Box>Blog</Box>
        </Stack>

        {/* Stay Connected Column */}
        <Stack spacing={1}>
          <Typography variant="h6">STAY CONNECTED</Typography>
          <Box>Star Tech LTD</Box>
          <Box>
            Head Office: 28 Kazi Nazrul Islam Ave, <br /> Navana Zohura Square,
            Dhaka 1000
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Footer;
