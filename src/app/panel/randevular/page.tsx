import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { STATUS_LABELS, STATUS_COLORS, formatDate } from '@/lib/utils';
import AppointmentActions from '@/components/AppointmentActions'; // Client component for actions

export default async function AppointmentsPage({ searchParams }: { searchParams: { status?: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session!.user.id;
  const isArtist = session!.user.role === 'ARTIST';
  
  const statusFilter = searchParams.status;

  let appointments: any[] = [];
  
  if (isArtist) {
    const artist = await prisma.artistProfile.findUnique({ where: { userId } });
    if (artist) {
      appointments = await prisma.appointment.findMany({
        where: { 
          artistProfileId: artist.id,
          ...(statusFilter && statusFilter !== 'all' ? { status: statusFilter as any } : {})
        },
        include: { customer: true },
        orderBy: { requestedDate: 'desc' }
      });
    }
  } else {
    appointments = await prisma.appointment.findMany({
      where: { 
        customerId: userId,
        ...(statusFilter && statusFilter !== 'all' ? { status: statusFilter as any } : {})
      },
      include: { artistProfile: { include: { user: true } } },
      orderBy: { requestedDate: 'desc' }
    });
  }

  const tabs = [
    { id: 'all', label: 'Tümü' },
    { id: 'PENDING', label: 'Bekleyen' },
    { id: 'APPROVED', label: 'Onaylanan' },
    { id: 'COMPLETED', label: 'Tamamlanan' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Randevularım</h1>

      <div className="flex gap-2 border-b border-gray-800 pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <a 
            key={tab.id} 
            href={`/panel/randevular?status=${tab.id}`}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium ${
              (statusFilter === tab.id || (!statusFilter && tab.id === 'all')) 
                ? 'bg-ink-500/10 text-ink-500' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className="space-y-4">
        {appointments.length > 0 ? appointments.map(appt => (
          <div key={appt.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg text-white">
                  {isArtist ? appt.customer.name : (appt as any).artistProfile.user.name}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium bg-${STATUS_COLORS[appt.status]}/10 text-${STATUS_COLORS[appt.status]}`}>
                  {STATUS_LABELS[appt.status]}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Tarih: <span className="text-gray-200">{formatDate(appt.requestedDate)}</span>
              </p>
              {appt.description && (
                <p className="text-gray-300 mt-2">{appt.description}</p>
              )}
            </div>
            
            <div>
              <AppointmentActions appointmentId={appt.id} status={appt.status} isArtist={isArtist} depositPaid={(appt as any).depositPaid} />
            </div>
          </div>
        )) : (
          <p className="text-gray-400 bg-gray-900 p-8 rounded-xl text-center border border-gray-800">
            Randevu bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}
