import AppBar from "@comp/appBar";
import TemplateList from "@comp/templateList";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Box from '@material-ui/core/Box';

export async function getServerSideProps() {
  const qs = new URLSearchParams({
    type: AppConst.URL_QUERY_TYPE.LIST
  });

  const url = process.env.URL_HOST_TEST + AppConst.API.TEMPLATE + `?${qs}`;

  const response = await fetch(url)
  return {

    props: {
      templateList: await response.json()
    }
  }
}

export default function Home(props) {
  const router = useRouter();

  /**
   * テンプレート追加
   */
  const addTemplate = () => {
    router.push(AppConst.URL.TEMPLATE_INPUT)
  }
  return (
    <>
      <AppBar onButtonClick={addTemplate}/>
      <Box mx={10} mt={4}>
      <TemplateList templateList={props.templateList} title="「AA」の検索結果"/>
      </Box>
      {/* <Test /> */}
    </>
  )
}
