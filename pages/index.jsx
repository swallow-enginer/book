import AppBar from "@comp/appBar";
import TemplateList from "@comp/templateList";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Typography from '@material-ui/core/Typography';
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
          <Box display="flex" alignItems="center">
            <h2>完読状況</h2>
          </Box>
          <Typography>現在の積み上げ：200mm(60ページ)</Typography>
          <Typography>広辞苑まで：100mm(50ページ)</Typography>
          <TemplateList templateList={props.templateList} title="最近の記録"/>
        </Box>
      {/* <Test /> */}
    </>
  )
}
