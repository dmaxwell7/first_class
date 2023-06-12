import {
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	IconButton,
	Stack,
	Paper,
	Typography,
	TextField,
} from "@mui/material"
import { useMutation, useQuery } from "@tanstack/react-query"
import { query } from "firebase/firestore"
import { Plus } from "phosphor-react"
import React from "react"

import { fetchAnnoucments } from "src/queries/communities/fetch_announcements"
import AnnouncementCard from "./AnnouncementCard"
import CreateAnnouncementModal from "./CreateAnnouncementsModal"
import DeleteAnnouncementModal from "./DeleteAnnouncementsModal"
import AnnoucementForm from "./AnnoucementsForm"

interface CommunityAnnoucmentsProps {
	communityId: string
	editMode?: boolean
}
function CommunityAnnoucments({
	communityId,
	editMode,
}: CommunityAnnoucmentsProps) {
	const [showAnnouncementModal, setShowAnnouncementModal] =
		React.useState(false)
	const [deleteAnnouncementId, setDeleteAnnouncement] = React.useState("")
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Announcements", communityId],
		queryFn: async ({ queryKey }) =>
			fetchAnnoucments({
				communityId: queryKey[1] as string,
			}),
	})
	const handleAnnouncementSubmit = () => {
		setShowAnnouncementModal(false)
		refetch()
	}

	const handleDeleteAnnouncement = () => {
		refetch()
		setDeleteAnnouncement("")
	}

	if (isLoading) return null
	return (
		<>
			<Card>
				<CardContent>
					<Stack>
						<Typography variant="h5" gutterBottom>
							Announcements
						</Typography>
						{editMode ? (
							<AnnoucementForm
								communityId={communityId}
								onSubmit={handleAnnouncementSubmit}
							/>
						) : null}
					</Stack>
					<Divider sx={{ my: 2 }} />
					<Grid
						container
						minHeight={{ md: 100, xs: 100 }}
						maxHeight={{ md: 450, xs: 300 }}
						overflow="scroll"
						rowGap={1}
					>
						{data?.map((announcement) => (
							<Grid item xs={12} key={announcement.id}>
								<AnnouncementCard
									Announcement={announcement}
									owner={editMode}
									onRemove={() =>
										setDeleteAnnouncement(announcement.id)
									}
								/>
							</Grid>
						))}
					</Grid>
				</CardContent>
			</Card>

			{showAnnouncementModal ? (
				<CreateAnnouncementModal
					communityId={communityId}
					open
					onClose={() => setShowAnnouncementModal(false)}
					onSubmit={handleAnnouncementSubmit}
				/>
			) : null}

			{deleteAnnouncementId ? (
				<DeleteAnnouncementModal
					open
					onClose={() => setDeleteAnnouncement("")}
					onSubmit={handleDeleteAnnouncement}
					communityId={communityId}
					announcementId={deleteAnnouncementId}
				/>
			) : null}
		</>
	)
}

export default CommunityAnnoucments
