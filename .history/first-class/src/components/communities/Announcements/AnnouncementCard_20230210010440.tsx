import React from "react"
import { Trash } from "phosphor-react"
import { Box, Typography, Button, Card, CardContent } from "@mui/material"
import { Announcement } from "src/types"

interface AnnouncementCardProps {
	Announcement: Announcement
	owner?: boolean
	onRemove?: () => void
}
function AnnouncementCard({
	Announcement,
	owner,
	onRemove,
}: AnnouncementCardProps) {
	return (
		<Card
			elevation={0}
			sx={{
				borderColor: "rgba(255, 255, 255, 0.12)",
				borderStyle: "solid",
				borderRadius: 2,
			}}
		>
			<CardContent>
				<Typography
					sx={{
						fontWeight: "bold",
						fontSize: 30,
						textTransform: "capitalize",
					}}
				>
					{Announcement.title}
				</Typography>
				<Typography
					gutterBottom
					sx={{
						color: "#CDCDCD",
						fontSize: 16,
						textTransform: "capitalize",
					}}
				>
					{Announcement.subtitle}
				</Typography>
				<Typography gutterBottom fontWeight="thin">
					{Announcement.description}
				</Typography>
				{owner ? (
					<Button
						color="error"
						onClick={onRemove}
						startIcon={<Trash />}
					>
						Delete
					</Button>
				) : null}
			</CardContent>
		</Card>
	)
}

export default AnnouncementCard
