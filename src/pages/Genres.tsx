import StoryCollection from "../components/StoryCollection";

function Genres() {
  return (
    <div className="max-w-screen-xl p-[1rem] mx-auto ">
      <StoryCollection
        title="Werewolf Novels & Books"
        showFilter={true}
        clientURL="/"
        serverURL="/"
        description="Our collection of werewolf novels takes you deep into the world of lycanthropy, where primal instincts and the supernatural converge. These stories range from gripping werewolf stories online, perfect for a quick yet thrilling read, to popular werewolf novels that have defined the genre. Featuring unique werewolf novels and the best of werewolf fiction, our selection explores various facets of werewolf lore. Readers can enjoy heart-racing werewolf romance novels that blend passionate love stories with the allure of the supernatural. Whether it’s a tale of a lone werewolf or the dynamics of a powerful pack, these narratives are as diverse as they are engaging, offering something for every fan of this thrilling genre"
      />
    </div>
  );
}

export default Genres;
