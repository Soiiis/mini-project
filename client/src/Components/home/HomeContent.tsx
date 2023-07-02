import { Button, Card, Drawer, Grid, Link, Typography } from "@mui/material";
import ImageContent from "../../images/ImageContent.png";
import UnderImage from "../../images/UnderImage.png";
import OverImage from "../../images/OverImage.png";
import Image1 from "../../images/PostContentImages/Image1.png";
import Image2 from "../../images/PostContentImages/Image2.png";
import Image3 from "../../images/PostContentImages/Image3.png";
import Image4 from "../../images/PostContentImages/Image4.png";
import React from "react";

export const HomeContent = () => {
    const data = [
        {
            image: Image1,
            title:
                "Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000",
            description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.",
            content: "The United Nations Children's Fund (UNICEF) is a relief fund established by the United Nations General Assembly on December 11, 1946.In 1953, the United Nations changed its name from the United Nations International Children's Emergency Fund (English: United Nations International Children's Emergency Fund) which is known in Vietnamese as the United Nations Children's Emergency Fund, but it is still abbreviated from the initials UNICEF derived from the old name.UNICEF, also known as the United Nations International Children's Emergency Fund, is a United Nations agency responsible for providing humanitarian and developmental aid to children worldwide. The agency is among the most widespread and recognized social welfare organizations in the world, with a presence in 192 countries and territories. UNICEF's activities include providing immunizations and disease prevention, administering treatment for children and mothers with HIV, enhancing childhood and maternal nutrition, improving sanitation, promoting education, and providing emergency relief in response to disasters."
        },
        {
            image: Image2,
            title:
                "Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.",
            content: "In 1953, the organization became a permanent part of the United Nations, changing its name to the United Nations Children's Fund, but retaining the old abbreviation UNICEF. So when anyone asks what UNICEF is, you just need to answer that the United Nations Children's Fund is enough.During the 1960s, UNICEF expanded its scope, mission, and field of activity to include advocating and promoting children's rights to education, health care, and ensuring their needs nutrition.In 1965, UNICEF was awarded the Nobel Peace Prize for its noble achievements and goals. After that, UNICEF began to expand its scope of activities to support and fight for the rights of women in developing countries, especially those who are mothers.In 1982, UNICEF established a health care program for children, focusing on growth monitoring, oral rehydration therapy, breastfeeding advocates, and vaccinations.In 1989, the United Nations General Assembly agreed to ratify the Convention on the Rights of the Child, which UNICEF has used in its programs and systems"
        },
        {
            image: Image3,
            title:
                "Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.",
            content: "According to UNICEF's mission statement, UNICEF is authorized by the United Nations General Assembly to protect children's rights, help meet children's basic needs, and expand opportunities for development. develop children's full potential. UNICEF's activities can be divided into four main groups:Protect children from situations of violence, exploitation, and abuse. Issues of concern include child labour, child marriage, child recruitment into the military, child trafficking, female genital mutilation, landmines, and sexual violence Support basic education and gender equality, including early childhood education, improve the quality of primary and secondary education, and ensure equitable access to education for both boys and girls. Provide humanitarian aid in times of crisis and emergency, with a focus on protecting the rights and lives of children who suffer from both natural disasters (such as tsunamis) and man-made disasters (like war)"
        },
        {
            image: Image4,
            title:
                "Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.",
            content: "For areas suffering from hunger and where there is not enough food, UNICEF will assist by providing meals for children, and children will be weighed and measured to monitor growth and nutrition.UNICEF also promotes and ensures the education of girls (at least they must complete primary education) because it benefits all children, both boys and girls. Girls who are educated when they grow up will have a better mindset to be able to become a better citizen, a better mother to raise their children.UNICEF has always upheld the Convention on the Rights of the Child. This organization works to ensure equality for those who are discriminated against, especially women. The organization also works towards the Millennium Development Goals and the progress outlined in the United Nations Charter. The organization strives for peace and security and holds everyone accountable to its promise for the global child."
        },
    ];
    const [open, setOpen] = React.useState(false);
    const [drawerTitle, setDrawerTitle] = React.useState("");
    const [drawerImage, setDrawerImage] = React.useState("");
    const [drawerContent, setDrawerContent] = React.useState("");

    const handleDrawerOpen = (title: any, image: any, drawerContent: any) => {
        setOpen(true);
        setDrawerTitle(title);
        setDrawerImage(image);
        setDrawerContent(drawerContent);
    };

    const hanldeDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Grid container spacing={1} sx={{ mt: 3, pl: 2, pr: 2 }}>
                <Grid
                    item
                    xs={9}
                    sx={{
                        backgroundImage: `url(${ImageContent})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></Grid>
                <Grid item xs={3} sx={{ pt: " 0!important" }}>
                    <Grid container sx={{ p: 3, backgroundColor: "#FEF2DB" }}>
                        <Grid item xs={7}>
                            <Typography sx={{ fontSize: "18px", color: "#CA993A" }}>
                                Money Donation
                            </Typography>
                            <Typography sx={{ fontSize: "11px", color: "#CA993A" }}>
                                Lorem ipsum dolor sit amet, consectetur
                            </Typography>
                            <Button
                                size="small"
                                sx={{
                                    backgroundColor: "#FEE5B6",
                                    mt: 1,
                                    color: "#CA993A",
                                    textTransform: "none",
                                }}
                            >
                                <Link
                                    sx={{ textDecoration: "none" }}
                                    href="https://www.unicef.org/vietnam/vi/gi%E1%BB%9Bi-thi%E1%BB%87u-v%E1%BB%81-unicef"
                                >
                                    Make a donation
                                </Link>
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <img src={OverImage} width={100} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ p: 3, backgroundColor: "#D5EEDB", mt: "22px" }}>
                        <Grid item xs={7}>
                            <Typography sx={{ fontSize: "18px", color: "#2BA84A" }}>
                                Money Donation
                            </Typography>
                            <Typography sx={{ fontSize: "11px", color: "#2BA84A" }}>
                                Lorem ipsum dolor sit amet, consectetur
                            </Typography>
                            <Button
                                size="small"
                                sx={{
                                    backgroundColor: "#AADCB7",
                                    mt: 1,
                                    color: "#2BA84A",
                                    textTransform: "none",
                                }}
                            >
                                <Link
                                    sx={{ textDecoration: "none" }}
                                    href="https://www.unicef.org/vietnam/vi/gi%E1%BB%9Bi-thi%E1%BB%87u-v%E1%BB%81-unicef"
                                >
                                    Make a donation
                                </Link>
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <img src={UnderImage} width={100} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ mt: 2, pl: 2 }}>
                <Typography
                    sx={{ fontSize: "24px", color: "#2C3A4B", fontWeight: 600 }}
                >
                    Read news
                </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2, pl: 2, pb: 5, pr: 2 }}>
                {data.map((value, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Grid
                                sx={{
                                    backgroundImage: `url(${value.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    minHeight: "170px",
                                    borderTop: "2px solid",
                                    borderLeft: "2px solid",
                                    borderRight: "6px solid",
                                    cursor: "pointer",
                                    borderTopLeftRadius: "8px",
                                    borderTopRightRadius: "8px",
                                }}
                                onClick={() =>
                                    handleDrawerOpen(value.title, value.image, value.content)
                                }
                            />
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    color: "#09101D",
                                    fontWeight: 600,
                                    borderLeft: "2px solid",
                                    borderRight: "6px solid",
                                    pt: 2,
                                    pl: 1,
                                }}
                            >
                                {value.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "13px",
                                    color: "#353945",
                                    fontWeight: 400,
                                    borderLeft: "2px solid",
                                    borderRight: "6px solid",
                                    borderBottom: "6px solid",
                                    borderBottomLeftRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                    pl: 1,
                                    pr: 1,
                                    pb: 2,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {value.description}
                            </Typography>
                        </Grid>
                    );
                })}
            </Grid>
            <Drawer
                anchor="right"
                open={open}
                onClose={hanldeDrawerClose}
                PaperProps={{
                    sx: {
                        width: "50%",
                    },
                }}
            >
                <Grid sx={{ m: 3 }}>
                    <h1 style={{ textAlign: "center" }}>{drawerTitle}</h1>
                    <Grid
                        container
                        sx={{
                            backgroundImage: `url(${drawerImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "470px",
                            mt: 3,
                        }}
                    ></Grid>
                    <p style={{ textAlign: "center", marginTop: "24px" }}>
                        {drawerContent}
                    </p>
                </Grid>
            </Drawer>
        </>
    );
};
