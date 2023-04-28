import { Button, Card, Grid, Typography } from "@mui/material"
import ImageContent from '../../images/ImageContent.png'
import ImageDonation from "../../images/MoneyDonation1.png"
import UnderImage from "../../images/UnderImage.png"
import OverImage from "../../images/OverImage.png"
import Image1 from '../../images/PostContentImages/Image1.png'
import Image2 from '../../images/PostContentImages/Image2.png'
import Image3 from '../../images/PostContentImages/Image3.png'
import Image4 from '../../images/PostContentImages/Image4.png'


export const HomeContent = () => {
    const data = [
        {
            image: Image1,
            title: 'Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000',
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.',
        },
        {
            image: Image2,
            title: 'Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000',
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.',
        },
        {
            image: Image3,
            title: 'Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000',
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.',
        },
        {
            image: Image4,
            title: 'Crawford Room, Mortlock Wing, Cnr. North Terrace And Kintore Avenue Adelaide SA 5000',
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Ullamco est sit aliqua dolor do amet sint.',
        },
    ]
    return (
        <>
            <Grid container spacing={1} sx={{ mt: 3 }}>
                <Grid item xs={9}>
                    <img src={ImageContent} alt="image content" />
                </Grid>
                <Grid item xs={3} sx={{ pr: 2 }}>
                    <Grid container sx={{ p: 3, backgroundColor: '#FEF2DB' }}>
                        <Grid item xs={7}>
                            <Typography sx={{ fontSize: '18px', color: '#CA993A' }}>Money Donation</Typography>
                            <Typography sx={{ fontSize: '11px', color: '#CA993A' }}>Lorem ipsum dolor sit amet, consectetur</Typography>
                            <Button size="small" sx={{ backgroundColor: '#FEE5B6', mt: 1, color: '#CA993A', textTransform: 'none' }}>Make a donation</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <img src={OverImage} width={100} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ p: 3, backgroundColor: '#D5EEDB', mt: '22px' }}>
                        <Grid item xs={7}>
                            <Typography sx={{ fontSize: '18px', color: '#2BA84A' }}>Money Donation</Typography>
                            <Typography sx={{ fontSize: '11px', color: '#2BA84A' }}>Lorem ipsum dolor sit amet, consectetur</Typography>
                            <Button size="small" sx={{ backgroundColor: '#AADCB7', mt: 1, color: '#2BA84A', textTransform: 'none' }}>Make a donation</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <img src={UnderImage} width={100} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: '24px', color: '#2C3A4B', fontWeight: 600 }}>Read news</Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {data.map((value, index) => {
                    return (
                        <Grid item key={index} xs={3}>
                            <img src={value.image} />
                            <Typography sx={{ fontSize: '16px', color: '#09101D', fontWeight: 600 }}>{value.title}</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#353945', fontWeight: 400 }}>{value.description}</Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}