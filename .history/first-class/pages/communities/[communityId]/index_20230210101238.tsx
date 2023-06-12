import React from "react"
import { useRouter } from "next/router"
import { MonitorPlay, Users, UserRectangle } from "phosphor-react"
import { Box, Grid, Tabs, Tab } from "@mui/material"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { Community } from "src/types"
import { getCommunityById } from "src/queries/communities/getCommunityById"
import TabPanel from "src/components/shared/TabPanel"
import VideoGrid from "src/components/communities/video/VideoGrid"
import CommunityProfile from "src/components/communities/Profile/ProfileTab"
import CommunityHero from "src/components/communities/CommunityHero"

function CommunityPage() {
	const router = useRouter()
	const { communityId } = router.query
	const { data: community, isLoading } = useQuery<
		any,
		Error,
		Community | null
	>({
		queryKey: ["community", communityId],
		queryFn: ({ queryKey }) => {
			return getCommunityById(queryKey[1] as string)
		},
	})
	const [value, setValue] = React.useState(0)
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	if (!community) return null
	return isLoading ? null : (
		<>
			<Grid container>
				<CommunityHero community={community!}>
					<Tabs
						justify-content:
						value={value}
						variant="scrollable"
						scrollButtons="auto"
						allowScrollButtonsMobile
						onChange={handleChange}
					>
						<Tab
							disableRipple
							label="gallery"
							icon={<MonitorPlay size={24} />}
							iconPosition="start"
						/>

						<Tab
							disableRipple
							label="profile"
							icon={<UserRectangle size={24} />} 
							iconPosition="start"
						/>
						<Tab
							disabled
							disableRipple
							label="Followers"
							icon={<Users size={24} />}
							iconPosition="start"
						/>
					</Tabs>
				</CommunityHero>

				<TabPanel
					value={value}
					index={0}
					mt={2}
					px={3}
					sx={{ flexBasis: "100%", maxWidth: "100%" }}
				>
					<VideoGrid
						communityId={community.id!}
						editMode={false}
						onVideoClick={(videoId) =>
							router.push(
								`/communities/${communityId}/${videoId}`
							)
						}
					/>
				</TabPanel>
				<TabPanel
					value={value}
					index={1}
					mt={2}
					px={3}
					sx={{ flexBasis: "100%", maxWidth: "100%" }}
				>
					<CommunityProfile communityId={community.id!} />
				</TabPanel>
				<TabPanel value={value} index={2} mt={2} px={3}>
					Followers
				</TabPanel>
				<TabPanel value={value} index={3} mt={2} px={3}>
					Settings
				</TabPanel>
			</Grid>

			<Box my={4} />
		</>
	)
}

export default CommunityPage
