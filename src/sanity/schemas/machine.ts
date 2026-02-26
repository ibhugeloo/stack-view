export const machineSchema = {
  name: "machine",
  title: "Machine",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Hostname",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "ip",
      title: "IP Address",
      type: "string",
    },
    {
      name: "isStatic",
      title: "Static IP",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "os",
      title: "Operating System",
      type: "string",
      options: {
        list: [
          { title: "Ubuntu", value: "ubuntu" },
          { title: "Debian", value: "debian" },
          { title: "CentOS", value: "centos" },
          { title: "Windows Server", value: "windows" },
          { title: "macOS", value: "macos" },
          { title: "Proxmox", value: "proxmox" },
          { title: "ESXi", value: "esxi" },
          { title: "TrueNAS", value: "truenas" },
          { title: "pfSense", value: "pfsense" },
        ],
      },
    },
    {
      name: "projectId",
      title: "Project",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "tasks",
      title: "Tasks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "done", title: "Done", type: "boolean", initialValue: false },
          ],
        },
      ],
    },
  ],
};
