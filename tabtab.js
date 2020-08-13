// const Tab = ({ companies, countries, videos, isMovie }) => {
//   const tabList = ["company", "country", "video"];
//   const [active, setActive] = useState("company");
//   const clickHandler = (event) => {
//     setActive(event.target.className);
//   };
//   return (
//     <Container>
//       <TabList>
//         {tabList.map((tab, idx) => (
//           <Item key={idx} isActive={active === tab ? "active" : null}>
//             <Link
//               key={tab}
//               to={`#${tab}`}
//               onClick={clickHandler}
//               className={tab}
//             >
//               {tab}
//             </Link>
//           </Item>
//         ))}
//       </TabList>
//       <Content>
//         {active === "company" && (
//           <TabDetail>
//             {companies.map(({ logo_path, name }) => (
//               <ImgList key={name}>
//                 <Img
//                   src={
//                     logo_path
//                       ? `https://image.tmdb.org/t/p/original${logo_path}`
//                       : require("../assets/noPosterSmall.png")
//                   }
//                 />
//                 <Name>{name}</Name>
//               </ImgList>
//             ))}
//           </TabDetail>
//         )}

//         {active === "country" &&
//           countries.map((country, idx) => (
//             <TabDetail key={active + idx}>
//               <Name>{isMovie ? country.name : country}</Name>
//             </TabDetail>
//           ))}

//         {active === "video" && (
//           <TabDetail>
//             {videos.map(({ id, key, name }) => (
//               <VideoItem key={id}>
//                 <iframe
//                   id={id}
//                   title={name}
//                   name={name}
//                   src={`https://www.youtube.com/embed/${key}`}
//                   width="300"
//                   height="170"
//                 ></iframe>
//               </VideoItem>
//             ))}
//           </TabDetail>
//         )}
//       </Content>
//     </Container>
//   );
// };
