import Login from "../../pages/login/Login.js";
import Dashboard from "../../pages/dashboard/Dashboard.js";
import ReadCourse from "../../pages/content/admin/course/readCourse.js";
import ReadGroup from "../../pages/content/admin/group/readGroup.js";
import ReadStudent from "../../pages/content/admin/student/readStudent.js";
import ReadTeacher from "../../pages/content/admin/teacher/readTeacher.js";

 const routesData = [
    {
        path:"/",
        component:<Login/>
    },
    {
        path:"/dashboard",
        component:<Dashboard />
    },
    {
        path:"/admin/course",
        component:<ReadCourse/>
    },
    {
        path:"/admin/group",
        component:<ReadGroup/>
    },
    {
        path:"/admin/student",
        component:<ReadStudent/>
    },
    {
        path: "/admin/teacher",
        component: <ReadTeacher/>
    }
]
export default routesData;