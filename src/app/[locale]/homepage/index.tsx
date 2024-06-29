import Hero from "@/components/Hero"
import PageContainer from "@/components/PageContainer"

const HomePage = () => {
    return <PageContainer className="flex flex-col items-center justify-center bg-gray-100 pt-10">
      <Hero />
    </PageContainer>
}

export default HomePage;